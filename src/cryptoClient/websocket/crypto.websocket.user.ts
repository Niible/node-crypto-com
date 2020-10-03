import { HmacSHA256, enc } from 'crypto-js';
import { CryptoWebsocketBase } from './crypto.websocket.base';
import {
  PublicMethod,
  PrivateMethod,
  OrderType,
  OrderSide,
  InstrumentName,
  GetAccountSummaryParams,
  Request,
  CancelAllOrdersParams,
  CancelOrderParams,
  CreateOrderParams,
  GetOpenOrdersParams,
  GetOrderDetailParams,
  GetOrderHistory,
  GetTradesParams,
} from '../../types';

export class CryptoWebsocketUser extends CryptoWebsocketBase {
  constructor(apiKey: string, apiSecret: string) {
    super(apiKey, apiSecret, 'wss://stream.crypto.com/v2/user');
    this.setup();
  }

  public authenticate(): void {
    if (!this.isReady) return;
    const request = this.buildMessage(PublicMethod.auth);
    this.send(this.signRequest(request));
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
    const sigPayload = method + id + this.apiKey + paramsString + nonce;
    request.sig = HmacSHA256(sigPayload, this.apiSecret).toString(enc.Hex);
    return request;
  }

  getInstruments(): string {
    return this.get(PublicMethod['get-instruments']);
  }

  getAccountSummary(params: GetAccountSummaryParams): string {
    return this.get(PrivateMethod['get-account-summary'], params);
  }

  createOrder(params: CreateOrderParams): string {
    if (params.type === OrderType.MARKET && params.side === OrderSide.BUY) {
      if (!params.notional) {
        throw new Error(
          'the param notional should be set for this type of order',
        );
      }
    } else if (!params.quantity) {
      throw new Error(
        'the param quantity should be set for this type of order',
      );
    }

    if (params.price && params.type === OrderType.MARKET) {
      throw new Error(
        'the param price should not be set for this type of order',
      );
    }

    return this.get(PrivateMethod['create-order'], params);
  }

  cancelOrder(params: CancelOrderParams): void {
    this.get(PrivateMethod['cancel-order'], params);
  }

  cancelAllOrders(params: CancelAllOrdersParams): string {
    return this.get(PrivateMethod['cancel-all-orders'], params);
  }

  getOrderHistory(params: GetOrderHistory): string {
    return this.get(PrivateMethod['get-order-history'], params);
  }

  getOpenOrders(params: GetOpenOrdersParams): string {
    return this.get(PrivateMethod['get-open-orders'], params);
  }

  getOrderDetail(params: GetOrderDetailParams): string {
    return this.get(PrivateMethod['get-order-detail'], params);
  }

  getTrades(params: GetTradesParams): string {
    return this.get(PrivateMethod['get-trades'], params);
  }

  public get(
    method: PublicMethod | PrivateMethod,
    params?: unknown,
    sign?: boolean,
  ): string {
    if (!this.isReady) return;
    let request = this.buildMessage(method, params);
    if (sign) request = this.signRequest(request);
    this.send(request);
    return method;
  }

  orderSubscribe(instrumentName: InstrumentName | string): string {
    const channel = `user.order.${instrumentName}`;
    this.subscribe(channel);
    return channel;
  }

  tradeSubscribe(instrumentName: InstrumentName | string): string {
    const channel = `user.trade.${instrumentName}`;
    this.subscribe(channel);
    return channel;
  }

  balanceSubscribe(): string {
    const channel = 'user.balance';
    this.subscribe(channel);
    return channel;
  }
}
