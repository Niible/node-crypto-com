import WebSocket from 'ws';
import { HmacSHA256, enc } from 'crypto-js';
import { CryptoWebsocketBase } from './crypto.websocket.base';
import {
  PublicMethod,
  AccountSummaryParams,
  PrivateMethod,
  CreateOrderParams,
  OrderType,
  OrderSide,
  CancelOrderParams,
  CancelAllOrdersParams,
  GetOrderHistory,
  GetOpenOrdersParams,
  GetOrderDetailParams,
  GetTradesParams,
  Params,
  Request,
} from '../../types/crypto.h';

export class CryptoWebsocketUser extends CryptoWebsocketBase {
  constructor(apiKey: string, apiSecret: string) {
    super(apiKey, apiSecret, new WebSocket('wss://stream.crypto.com/v2/user'));
    this.setup();
  }

  public authenticate(): void {
    if (!this.isReady) return;
    const request = this.buildMessage(PublicMethod.auth);
    this.send(this.signRequest(request));
  }

  public signRequest(request: Request): Request {
    const {
      id, method, params, nonce,
    } = request;
    const paramsString = params == null
      ? ''
      : Object.keys(params)
        .sort()
        .reduce((a, b) => a + b + params[b], '');
    if (!request.api_key) request.api_key = this.apiKey;
    const sigPayload = method + id + this.apiKey + paramsString + nonce;
    request.sig = HmacSHA256(sigPayload, this.apiSecret).toString(enc.Hex);
    return request;
  }

  getInstruments(): void {
    this.get(PublicMethod['get-instruments']);
  }

  getAccountSummary(params: AccountSummaryParams): void {
    this.get(PrivateMethod['get-account-summary'], params);
  }

  createOrder(params: CreateOrderParams): void {
    if (params.type === OrderType.MARKET && params.side === OrderSide.BUY) {
      if (!params.notional) {
        throw new Error('the param notional should be set for this type of order');
      }
    } else if (!params.quantity) {
      throw new Error('the param quantity should be set for this type of order');
    }

    if (params.price && params.type === OrderType.MARKET) {
      throw new Error('the param price should not be set for this type of order');
    }

    this.get(PrivateMethod['create-order'], params);
  }

  cancelOrder(params: CancelOrderParams): void {
    this.get(PrivateMethod['cancel-order'], params);
  }

  cancelAllOrders(params: CancelAllOrdersParams): void {
    this.get(PrivateMethod['cancel-all-orders'], params);
  }

  getOrderHistory(params: GetOrderHistory): void {
    this.get(PrivateMethod['get-order-history'], params);
  }

  getOpenOrders(params: GetOpenOrdersParams): void {
    this.get(PrivateMethod['get-open-orders'], params);
  }

  getOrderDetail(params: GetOrderDetailParams): void {
    this.get(PrivateMethod['get-order-detail'], params);
  }

  getTrades(params: GetTradesParams): void {
    this.get(PrivateMethod['get-trades'], params);
  }

  public get(method: PublicMethod | PrivateMethod, params?: Params, sign?: boolean): void {
    if (!this.isReady) return;
    let request = this.buildMessage(method, params);
    if (sign) request = this.signRequest(request);
    this.send(request);
  }
}
