import { RateLimitExt } from 'rate-limit-ext';
import Axios, { AxiosStatic } from 'axios';
import { HmacSHA256, enc } from 'crypto-js';
import { Request, Options, Response } from '../../types/api.types';

export class CryptoApiBase {
  protected apiSecret: string;

  protected apiKey: string;

  protected nextId = 1;

  private api = 'https://api.crypto.com/v2/';

  constructor(apiKey?: string, apiSecret?: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  protected createRateLimit(period: number, reqLimit: number): AxiosStatic {
    return new RateLimitExt(Axios.create(), {
      period,
      reqLimit,
    }) as AxiosStatic;
  }

  protected get_nonce(): number {
    return new Date().getTime();
  }

  protected next_id(): number {
    const i = this.nextId;
    this.nextId += 1;
    return i;
  }

  public signRequest(request: Request<unknown>): Request<unknown> {
    const {
      id, method, params, nonce,
    } = request;
    const paramsString = params == null
      ? ''
      : Object.keys(params)
        .sort()
        .reduce((a, b) => a + b + params[b], '');
    if (!request.api_key) request.api_key = this.apiKey;
    const sigPayload = `${method}${id}${this.apiKey}${paramsString}${nonce}`;
    request.sig = HmacSHA256(sigPayload, this.apiSecret).toString(enc.Hex);
    return request;
  }

  public buildMessage(method: string, params?: unknown): Request<unknown> {
    const request: Request<unknown> = {
      id: this.next_id(),
      method,
      nonce: this.get_nonce(),
    };
    if (params) {
      request.params = params;
    }
    return request;
  }

  public async get(
    method: string,
    params = {} as unknown,
    options?: Options,
  ): Promise<Response<unknown>> {
    const url = `${this.api}${method}`;
    const axios = options.axios ? options.axios : Axios;
    try {
      const response = await axios.get(url, { params });
      const { status, data } = response;
      return { status, data };
    } catch (error) {
      const { status } = error.response;
      const { data } = error.response;
      return { data, status };
    }
  }

  public async post(
    method: string,
    params = {} as unknown,
    sign?: boolean,
    options?: Options,
  ): Promise<Response<unknown>> {
    let request = this.buildMessage(method, params);
    if (sign) request = this.signRequest(request);
    const url = `${this.api}${method}`;
    const axios = options.axios ? options.axios : Axios;
    try {
      const response = await axios.post(url, request, { headers: { 'content-type': 'application/json' } });
      const { status, data } = response;
      return { status, data };
    } catch (error) {
      const { status, data } = error.response;
      return { status, data };
    }
  }
}
