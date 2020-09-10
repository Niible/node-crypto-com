import { CryptoApiBase } from './crypto.api.base';
import {
  AccountSummaryParams,
  CreateOrderParams,
  CancelOrderParams,
  CancelAllOrdersParams,
  GetOrderHistory,
  GetOpenOrdersParams,
  GetOrderDetailParams,
  GetTradesParams,
  Response,
  PrivateMethod,
  OrderType,
  OrderSide,
} from '../../types/crypto.h';

export class CryptoPrivateApi extends CryptoApiBase {
  public async getAccountSummary(params: AccountSummaryParams): Promise<Response> {
    return this.post(PrivateMethod['get-account-summary'],
      { ...params, axios: this.createRateLimit(100, 3) },
      true);
  }

  public async createOrder(params: CreateOrderParams): Promise<Response> {
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

    return this.post(
      PrivateMethod['create-order'],
      { ...params, axios: this.createRateLimit(100, 15) },
      true,
    );
  }

  public async cancelOrder(params: CancelOrderParams): Promise<Response> {
    return this.post(
      PrivateMethod['cancel-order'],
      { ...params, axios: this.createRateLimit(100, 15) },
      true,
    );
  }

  public async cancelAllOrders(params: CancelAllOrdersParams): Promise<Response> {
    return this.post(
      PrivateMethod['cancel-all-orders'],
      { ...params, axios: this.createRateLimit(100, 15) },
      true,
    );
  }

  public async getOrderHistory(params: GetOrderHistory): Promise<Response> {
    return this.post(
      PrivateMethod['get-order-history'],
      { ...params, axios: this.createRateLimit(1000, 1) },
      true,
    );
  }

  public async getOpenOrders(params: GetOpenOrdersParams): Promise<Response> {
    return this.post(
      PrivateMethod['get-open-orders'],
      { ...params, axios: this.createRateLimit(100, 3) },
      true,
    );
  }

  public async getOrderDetail(params: GetOrderDetailParams): Promise<Response> {
    return this.post(
      PrivateMethod['get-order-detail'],
      { ...params, axios: this.createRateLimit(100, 30) },
      true,
    );
  }

  public async getTrades(params: GetTradesParams): Promise<Response> {
    return this.post(
      PrivateMethod['get-trades'],
      { ...params, axios: this.createRateLimit(1000, 1) },
      true,
    );
  }
}
