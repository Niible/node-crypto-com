import WebSocket from 'ws';
import ReconnectingWebSocket from 'reconnecting-websocket';
import {
  Params, Result, PublicMethod, Request,
} from '../../types/crypto.h';
import { sleep } from '../../utils/sleep';

export class CryptoWebsocketBase {
  public isAuthenticated = false;

  protected apiSecret: string;

  protected apiKey: string;

  protected websocket: ReconnectingWebSocket;

  protected nextId: number;

  protected isReady = false;

  protected response: Result<unknown>[] = [];

  constructor(apiKey: string, apiSecret: string, websocket: WebSocket) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.websocket = new ReconnectingWebSocket(websocket.url, [], {
      WebSocket,
      debug: false,
      connectionTimeout: 4e3,
      maxReconnectionDelay: 10e3,
      maxRetries: Infinity,
      minReconnectionDelay: 4e3,
    });
    this.nextId = 1;
  }

  protected setup(callback?: CallableFunction): void {
    this.websocket.onmessage = (message: { data: string }) => {
      if (callback) callback(message);
      const data = this.parseResult(JSON.parse(message.data));
      if (data) this.response.push(data);
    };
    this.websocket.onopen = () => {
      this.isReady = true;
    };
  }

  protected get_nonce(): number {
    return new Date().getTime();
  }

  protected next_id(): number {
    const i = this.nextId;
    this.nextId += 1;
    return i;
  }

  public async waitWebsocket(): Promise<boolean> {
    while (!this.isReady) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(100);
    }
    return true;
  }

  public buildMessage(method: string, params?: Params): Request {
    const message: Request = {
      id: this.next_id(),
      method,
      nonce: this.get_nonce(),
    };
    if (params) {
      message.params = params;
    }
    return message;
  }

  public send(request: Request): void {
    this.websocket.send(JSON.stringify(request));
  }

  public subscribe(channels: string[]): void {
    if (!this.isReady) return;
    const request = this.buildMessage('subscribe', { channels });
    this.send(request);
  }

  public unsubscribe(channels: string[]): void {
    if (!this.isReady) return;
    const request = this.buildMessage('unsubscribe', { channels });
    this.send(request);
  }

  private parseError(result: Result<unknown>): Result<unknown> {
    return result;
  }

  private parseResult(result: Result<unknown>): Result<unknown> | void {
    if (result.code !== 0 && result.method !== PublicMethod.heartbeat) {
      return this.parseError(result);
    }
    if (result.method === 'subscribe') {
      return this.handleSubscribe(result);
    }
    const publicOrPrivate = result.method.split('/')[0];
    switch (publicOrPrivate) {
      case 'public':
        return this.handlePublicMethod(result);
      case 'private':
        return this.handlePrivateMethod(result);
    }
  }

  private handlePublicMethod(result: Result<unknown>): Result<unknown> | void {
    if (result.method === 'public/heartbeat') {
      result.method = 'public/respond-heartbeat';
      this.websocket.send(JSON.stringify(result));
    } else if (result.method === 'public/auth') {
      if (result.code === 0) {
        this.isAuthenticated = true;
      }
    } else {
      return result;
    }
  }

  private handlePrivateMethod(data: Result<unknown>): Result<unknown> {
    return data;
  }

  private handleSubscribe(data: Result<unknown>): Result<unknown> {
    return data;
  }

  public hasResponses(): boolean {
    return this.response.length > 0;
  }

  async getNextResponse(): Promise<Result<unknown>> {
    while (!this.hasResponses()) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(100);
    }
    return this.response.shift();
  }
}
