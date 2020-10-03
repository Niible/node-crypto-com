import WebSocket from 'ws';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { hasOwnProperty, sleep } from '../../utils';
import {
  PublicMethod,
  Request,
  Result,
  SubscriptionResponse,
} from '../../types';

export class CryptoWebsocketBase {
  public isAuthenticated = false;

  private url: string;

  protected apiSecret: string;

  protected apiKey: string;

  protected websocket: ReconnectingWebSocket;

  protected nextId: number;

  protected isReady = false;

  protected subscriptions = [];

  protected readonly events: Record<string, Function[]> = {};

  constructor(apiKey: string, apiSecret: string, url: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.url = url;
    this.nextId = 1;
    this.open();
  }

  protected setup(): void {
    this.websocket.onmessage = (message) => {
      const payload = JSON.parse(message.data);
      this.handlePayload(payload);
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

  public buildMessage(method: string, params?: unknown): Request<unknown> {
    const message: Request<unknown> = {
      id: this.next_id(),
      method,
      nonce: this.get_nonce(),
    };
    if (params) {
      message.params = params;
    }
    return message;
  }

  public send(request: Request<unknown>): void {
    this.websocket.send(JSON.stringify(request));
  }

  public subscribe(...channels: string[]): void {
    if (!this.isReady) return;
    this.subscriptions.push(...channels);
    for (const channel of channels) {
      if (!~this.subscriptions.indexOf(channel)) {
        this.subscriptions.push(channel);
      }
    }
    const request = this.buildMessage('subscribe', { channels });
    this.send(request);
  }

  public unsubscribe(...channels: string[]): void {
    if (!this.isReady) return;

    for (const channel of channels) {
      const pos = this.subscriptions.indexOf(channel);
      if (~pos) {
        this.subscriptions.splice(pos, 1);
      }
    }

    const request = this.buildMessage('unsubscribe', { channels });
    this.send(request);
  }

  handlePayload(payload: Result<unknown>): void {
    const { method, code, result } = payload;
    if (method === PublicMethod.heartbeat) {
      payload.method = 'public/respond-heartbeat';
      return this.websocket.send(JSON.stringify(payload));
    }

    if (method === 'public/auth') {
      if (code === 0) this.isAuthenticated = true;
      return this.emit(method, payload);
    }

    if (method === 'subscribe') {
      if (result instanceof Object
        && hasOwnProperty(result, 'subscription')
          && typeof result.subscription === 'string') {
        this.emit(result.subscription, payload);
        if (result instanceof Object
          && hasOwnProperty(result, 'channel')
            && typeof result.channel === 'string'
              && result.subscription !== result.channel) {
          return this.emit(result.channel, payload);
        }
      }
      return;
    }

    if (method.includes('public') || method.includes('private')) {
      return this.emit(method, payload);
    }
  }

  public close(): void {
    this.websocket.close();
  }

  public open(): void {
    if (!this.websocket || (this.websocket && !this.websocket.OPEN)) {
      this.websocket = new ReconnectingWebSocket(this.url, [], {
        WebSocket,
        debug: false,
        connectionTimeout: 4e3,
        maxReconnectionDelay: 10e3,
        maxRetries: Infinity,
        minReconnectionDelay: 4e3,
      });
    }
  }

  public on<T>(
    streamName: string,
    cb: (data: SubscriptionResponse<T>) => void,
  ): void {
    if (!this.events[streamName]) {
      this.events[streamName] = [];
    }
    this.events[streamName].push(cb);
  }

  public off<T>(
    streamName: string,
    callback: (data: SubscriptionResponse<T>) => void,
  ): void {
    if (!this.events[streamName]) return;
    const index = this.events[streamName].indexOf(callback);
    if (!~index) return;

    this.events[streamName].splice(index, 1);

    if (!this.events[streamName].length) {
      delete this.events[streamName];
    }
  }

  protected emit(streamName: string, ...args: any[]): void {
    for (const handler of (this.events[streamName] || [])) {
      handler(...args);
    }
  }
}
