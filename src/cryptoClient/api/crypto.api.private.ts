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
  GetAccountSummaryResponse,
  CreateOrderResponse,
  CancelOrderResponse,
  CancelAllOrderResponse,
  GetOrderOpenOrdersResponse,
  GetMyTradesResponse,
  GetOrderDetailResponse,
  GetOrderHistoryResponse,
} from '../../types/crypto.h';

export class CryptoPrivateApi extends CryptoApiBase {
  public async getAccountSummary(
    params: AccountSummaryParams,
  ): Promise<Response<GetAccountSummaryResponse>> {
    return this.post(
      PrivateMethod['get-account-summary'],
      params,
      true,
      {
        axios: this.createRateLimit(100, 3),
      },
    ) as Promise<Response<GetAccountSummaryResponse>>;
  }

  public async createOrder(params: CreateOrderParams): Promise<Response<CreateOrderResponse>> {
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
      params,
      true,
      {
        axios: this.createRateLimit(100, 15),
      },
    ) as Promise<Response<CreateOrderResponse>>;
  }

  public async cancelOrder(params: CancelOrderParams): Promise<Response<CancelOrderResponse>> {
    return this.post(
      PrivateMethod['cancel-order'],
      params,
      true,
      {
        axios: this.createRateLimit(100, 15),
      },
    ) as Promise<Response<CancelOrderResponse>>;
  }

  public async cancelAllOrders(
    params: CancelAllOrdersParams,
  ): Promise<Response<CancelAllOrderResponse>> {
    return this.post(
      PrivateMethod['cancel-all-orders'],
      params,
      true,
      {
        axios: this.createRateLimit(100, 15),
      },
    ) as Promise<Response<CancelAllOrderResponse>>;
  }

  public async getOrderHistory(
    params: GetOrderHistory,
  ): Promise<Response<GetOrderHistoryResponse>> {
    return this.post(
      PrivateMethod['get-order-history'],
      params,
      true,
      {
        axios: this.createRateLimit(1000, 1),
      },
    ) as Promise<Response<GetOrderHistoryResponse>>;
  }

  public async getOpenOrders(
    params: GetOpenOrdersParams,
  ): Promise<Response<GetOrderOpenOrdersResponse>> {
    return this.post(
      PrivateMethod['get-open-orders'],
      params,
      true,
      {
        axios: this.createRateLimit(100, 3),
      },
    ) as Promise<Response<GetOrderOpenOrdersResponse>>;
  }

  public async getOrderDetail(
    params: GetOrderDetailParams,
  )
    : Promise<Response<GetOrderDetailResponse>> {
    return this.post(
      PrivateMethod['get-order-detail'],
      params,
      true,
      {
        axios: this.createRateLimit(100, 30),
      },
    ) as Promise<Response<GetOrderDetailResponse>>;
  }

  public async getTrades(params: GetTradesParams): Promise<Response<GetMyTradesResponse>> {
    return this.post(
      PrivateMethod['get-trades'],
      params,
      true,
      {
        axios: this.createRateLimit(1000, 1),
      },
    ) as Promise<Response<GetMyTradesResponse>>;
  }
}
