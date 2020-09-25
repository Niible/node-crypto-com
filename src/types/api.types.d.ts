import { AxiosStatic } from 'axios';
import {
  InstrumentName,
  OrderSide,
  OrderType,
  TimeInForce,
  Interval,
  Currency,
  Instrument,
  BookData,
  AccountSummary,
  Order,
  TradeList,
  OrderInfo,
} from './crypto.h';

// Create Request
export interface Request<T> {
  id: number;
  method: string;
  nonce: number;
  api_key?: string;
  params?: T;
  sig?: string;
}

export interface Options {
  axios?: AxiosStatic
}

// Public Request Params
export interface GetBookParams {
  instrument_name: InstrumentName;
  depth?: string;
}

export interface GetCandlestrickParams {
  instrument_name: InstrumentName;
  timeframe: Interval;
}

export interface GetTickerParams {
  instrument_name?: InstrumentName;
}

export interface GetTradesParams {
  instrument_name?: InstrumentName;
}

export interface GetAccountSummaryParams {
  currency?: Currency;
}

// Private Request Params

export interface CreateOrderParams {
  instrument_name: InstrumentName;
  side: OrderSide;
  type: OrderType;
  price?: number;
  quantity?: number;
  notional?: number;
  client_oid?: string;
  time_in_force?: TimeInForce;
  exec_inst?: string;
  trigger_price?: number;
}

export interface CancelOrderParams {
  instrument_name: InstrumentName;
  order_id: string;
}

export interface CancelAllOrdersParams {
  instrument_name: InstrumentName;
}

export interface GetOrderHistory {
  instrument_name?: InstrumentName;
  start_ts?: number;
  end_ts?: number;
  page_size?: number;
  page?: number;
}

export interface GetOpenOrdersParams {
  instrument_name?: InstrumentName;
  page_size?: number;
  page?: number;
}

export interface GetOrderDetailParams {
  order_id: string;
}

export interface GetPrivateTradesParams {
  instrument_name?: InstrumentName;
  start_ts?: number;
  end_ts?: number;
  page_size?: number;
  page?: number;
}

// Response for Api Request
export interface Response<T> {
  status: number
  data: T
}

export interface ResponseDefaultAttribute {
  id: number,
  method: string,
  code: number,
}

export type AuthResponse = ResponseDefaultAttribute;

export interface GetInstrumentsResponse extends ResponseDefaultAttribute {
  result: InstrumentsResult
}

export interface InstrumentsResult {
  instruments: Instrument[]
}

export interface GetBookResponse extends ResponseDefaultAttribute {
  result: BookResult
}

export interface BookResult {
  data: BookData[]
}

export interface GetTickerResponse extends ResponseDefaultAttribute {
  result: TickerResult
}

export interface TickerResult {
  data: Ticker[]
}

export interface Ticker {
  i: string
  b: number
  k: number
  a: number
  t: number
  v: number
  h: number
  l: number
  c: number
}

export interface GetTradesResponse extends ResponseDefaultAttribute {
  instrument_name: InstrumentName,
  result: TradesResult
}

export interface TradesResult {
  data: TradeResult[]
}

export interface TradeResult {
  i: string,
  p: number
  q: number
  s: string
  d: number
  t: number
  dataTime: number
}

export interface GetCandlestickResponse extends ResponseDefaultAttribute {
  result: CanslestickResult
}

export interface CanslestickResult {
  data: Candlestick[],
  interval: Interval,
  instrument_name: InstrumentName,
}

export interface Candlestick {
  t: number
  o: number
  h: number
  l: number
  c: number
  v: number
}

export interface GetAccountSummaryResponse extends ResponseDefaultAttribute {
  result: AccountSummaryResult
}

export interface AccountSummaryResult {
  accounts: AccountSummary[]
}

export interface CreateOrderResponse extends ResponseDefaultAttribute {
  result: CreateOrderResult
}

export interface CreateOrderResult {
  order_id: string
  client_oid: string
}

export type CancelOrderResponse = ResponseDefaultAttribute;
export type CancelAllOrderResponse = ResponseDefaultAttribute;

export interface GetOrderHistoryResponse extends ResponseDefaultAttribute {
  result: OrderHistoryResult
}

export interface OrderHistoryResult {
  order_list: Order[]
}

export interface GetOrderOpenOrdersResponse extends ResponseDefaultAttribute {
  result: OpenOrdersResult
}

export interface OpenOrdersResult {
  count: number
  order_list: Order[]
}

export interface GetOrderDetailResponse extends ResponseDefaultAttribute {
  result: OrderDetailResult
}

export interface OrderDetailResult {
  trade_list: TradeList[]
  order_info: OrderInfo[]
}

export interface GetPrivateTradesResponse extends ResponseDefaultAttribute {
  result: PrivateTradesResult
}

export interface PrivateTradesResult {
  trade_list: TradeList[]
}
