import {
  InstrumentName,
  Interval,
  Order,
  TradeList,
  Currency,
  BookData,
} from './crypto.h';
import {
  TradeResult,
  GetInstrumentsResponse,
  GetAccountSummaryResponse,
  CreateOrderResponse,
  CancelOrderResponse,
  CancelAllOrderResponse,
  GetOrderHistoryResponse,
  GetOrderOpenOrdersResponse,
  GetOrderDetailResponse,
  GetTradesResponse,
} from './api.types.h';

export enum WebsocketType {
  Market,
  User,
}

export interface Result<T> {
  id: number;
  method: string;
  code: number;
  result: T;
  message?: string; // For server or error messages
  original?: string; // Original request as a string, for error cases
}

export interface SubscriptionResponse<T> {
  code: string;
  method: string;
  result: T;
}

export interface SubscriptionDefaultAttribute {
  instrument_name: InstrumentName;
  subscription: string;
  channel: string;
}

export interface BookSubscription extends SubscriptionDefaultAttribute {
  depth: number;
  data: BookData[];
}

export interface TickerSubscription extends SubscriptionDefaultAttribute {
  data: TickerDataSubscription[];
}

export interface TickerDataSubscription {
  i: string;
  h: string;
  v: number;
  a: number;
  l: number;
  b: number;
  k: number;
  c: number;
  t: number;
}

export interface TradeSubscription extends SubscriptionDefaultAttribute {
  data: TradeResult[];
}

export interface CandlestickSubscription extends SubscriptionDefaultAttribute {
  interval: Interval;
  data: CandlestickSubscriptionData[];
}

export interface CandlestickSubscriptionData {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

export interface UserOrderSubscription extends SubscriptionDefaultAttribute {
  data: Order[];
}

export interface UserTradeSubscription extends SubscriptionDefaultAttribute {
  data: TradeList[];
}

export interface UserBalanceSubscription extends SubscriptionDefaultAttribute {
  data: Balance[];
}

export interface Balance {
  currency: Currency;
  balance: number;
  available: number;
  order: number;
  stake: number;
}

export type OnSubscribe =
  | UserBalanceSubscription
  | UserTradeSubscription
  | UserOrderSubscription
  | CandlestickSubscription
  | TradeSubscription
  | BookSubscription
  | TickerSubscription
  | GetInstrumentsResponse
  | GetAccountSummaryResponse
  | CreateOrderResponse
  | CancelOrderResponse
  | CancelAllOrderResponse
  | GetOrderHistoryResponse
  | GetOrderOpenOrdersResponse
  | GetOrderDetailResponse
  | GetTradesResponse;
