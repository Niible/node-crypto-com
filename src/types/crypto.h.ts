import { AxiosStatic } from 'axios';

export type Params = (AxiosParams & WebsocketParams) & (
  // api
  TradesParams |
  TickerParams |
  BookParams |
  GetTradesParams |
  GetOrderDetailParams |
  GetOrderHistory |
  CreateOrderParams |
  CancelAllOrdersParams |
  CancelOrderParams |
  AccountSummaryParams |
  CandlestrickParams |
  GetOpenOrdersParams);

export interface AxiosParams {
  axios?: AxiosStatic
}

export interface TradesParams {
  instrument_name?: InstrumentName | string
}

export interface TickerParams {
  instrument_name?: InstrumentName | string
}

export interface BookParams {
  instrument_name: InstrumentName | string
  depth?: string // up to 150
}

export interface GetTradesParams {
  instrument_name?: InstrumentName | string,
  start_ts?: number,
  end_ts?: number,
  page_size?: number,
  page?: number,
}

export interface GetOrderDetailParams {
  order_id: string
}

export interface GetOpenOrdersParams {
  instrument_name?: InstrumentName | string
  page_size?: number
  page?: number
}

export interface GetOrderHistory {
  instrument_name?: InstrumentName | string
  start_ts?: number
  end_ts?: number // max between start and end is 24 hours
  page_size?: number
  page?: number
}

export interface CancelAllOrdersParams {
  instrument_name: InstrumentName | string
}

export interface CancelOrderParams {
  instrument_name: InstrumentName | string
  order_id: string
}

export interface CreateOrderParams {
  instrument_name: InstrumentName | string
  side: OrderSide,
  type: OrderType
  price?: number // for Limit order Only -> unit price
  quantity?: number // for Limit order and Sell Market orders
  notional?: number // for BuyMarket only : Amount to spend
  client_oid?: string // Optional Client order id
  time_in_force?: TimeInForce
  exec_inst?: string
}

export enum TimeInForce {
  GOOD_TILL_CANCEL = 'GOOD_TILL_CANCEL',
  FILL_OR_KILL = 'FILL_OR_KILL',
  IMMEDIATE_OR_CANCEL = 'IMMEDIATE_OR_CANCEL',
}

export interface CandlestrickParams {
  instrument_name: InstrumentName | string
  timeframe: Period
}

export interface AccountSummaryParams {
  currency?: string
}

export interface WebsocketParams {
  channels?: string[]
}

export enum WebsocketType {
  Market,
  User,
}

export enum PublicMethod {
  'auth' = 'public/auth',
  'get-instruments' = 'public/get-instruments',
  'get-candlestick' = 'public/get-candlestick',
  'get-book' = 'public/get-book',
  'get-ticker' = 'public/get-ticker',
  'get-trades' = 'public/get-trades',
  'respond-heartbeat' = 'public/respond-heartbeat',
  'heartbeat' = 'public/heartbeat',
}

export enum PrivateMethod {
  'get-account-summary' = 'private/get-account-summary',
  'create-order' = 'private/create-order',
  'cancel-order' = 'private/cancel-order',
  'cancel-all-orders' = 'private/cancel-all-orders',
  'get-order-history' = 'private/get-order-history',
  'get-open-orders' = 'private/get-open-orders',
  'get-order-detail' = 'private/get-order-detail',
  'get-trades' = 'private/get-trades'
}

export interface Request {
  id: number
  method: string
  nonce: number
  api_key?: string
  params?: Params
  sig?: string
}

export interface Response {
  status: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
}

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
}

export enum OrderStatus {
  ACTIVE = 'ACTIVE',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

export interface Result {
  id: number
  method: string
  code: number
  result: Record<string, unknown>
  message: string
  original: string
}

export enum Period {
  Minutes = '1m',
  Minutes_5 = '5m',
  Minutes_15 = '15m',
  Minutes_30 = '30m',
  Hours = '1h',
  Hours_4 = '4h',
  Hours_6 = '6h',
  Hours_12 = '12h',
  Day = '1D',
  Week = '7D',
  Week_2 = '14D',
  Month = '1M',
}

export enum Coin {
  BTC = 'BTC',
  CRO = 'CRO',
  MCO = 'MCO',
  ETH = 'ETH',
  XRP = 'XRP',
  LTC = 'LTC',
  EOS = 'EOS',
  XLM = 'XLM',
  ATOM = 'ATOM',
  LINK = 'LINK',
  XTZ = 'XTZ',
  BCH = 'BCH',
  VET = 'VET',
  ICX = 'ICX',
  ADA = 'ADA',
  ENJ = 'ENJ',
  ALGO = 'ALGO',
  KNC = 'KNC',
  NEO = 'NEO',

  USDT = 'USDT',
  USDC = 'USDC',
}

export enum InstrumentName {
  CRO_BTC = 'CRO_BTC',
  MCO_BTC = 'MCO_BTC',
  ETH_BTC = 'ETH_BTC',
  XRP_BTC = 'XRP_BTC',
  LTC_BTC = 'LTC_BTC',
  EOS_BTC = 'EOS_BTC',
  XLM_BTC = 'XLM_BTC',
  ATOM_BTC = 'ATOM_BTC',
  LINK_BTC = 'LINK_BTC',
  XTZ_BTC = 'XTZ_BTC',
  BCH_BTC = 'BCH_BTC',
  VET_BTC = 'VET_BTC',
  ICX_BTC = 'ICX_BTC',
  ADA_BTC = 'ADA_BTC',
  ALGO_BTC = 'ALGO_BTC',
  NEO_BTC = 'NEO_BTC',

  USDC_USDT = 'USDC_USDT',
  BTC_USDT = 'BTC_USDT',
  CRO_USDT = 'CRO_USDT',
  MCO_USDT = 'MCO_USDT',
  ETH_USDT = 'ETH_USDT',
  XRP_USDT = 'XRP_USDT',
  LTC_USDT = 'LTC_USDT',
  EOS_USDT = 'EOS_USDT',
  XLM_USDT = 'XLM_USDT',
  ATOM_USDT = 'ATOM_USDT',
  LINK_USDT = 'LINK_USDT',
  XTZ_USDT = 'XTZ_USDT',
  BCH_USDT = 'BCH_USDT',
  VET_USDT = 'VET_USDT',
  ICX_USDT = 'ICX_USDT',
  ADA_USDT = 'ADA_USDT',
  ENJ_USDT = 'ENJ_USDT',
  ALGO_USDT = 'ALGO_USDT',
  KNC_USDT = 'KNC_USDT',
  NEO_USDT = 'NEO_USDT',

  MCO_CRO = 'MCO_CRO',
  ETH_CRO = 'ETH_CRO',
  XRP_CRO = 'XRP_CRO',
  LTC_CRO = 'LTC_CRO',
  EOS_CRO = 'EOS_CRO',
  XLM_CRO = 'XLM_CRO',
  ATOM_CRO = 'ATOM_CRO',
  LINK_CRO = 'LINK_CRO',
  XTZ_CRO = 'XTZ_CRO',
  BCH_CRO = 'BCH_CRO',
  VET_CRO = 'VET_CRO',
  ICX_CRO = 'ICX_CRO',
  ADA_CRO = 'ADA_CRO',
  ENJ_CRO = 'ENJ_CRO',
  ALGO_CRO = 'ALGO_CRO',
  KNC_CRO = 'KNC_CRO',
  NEO_CRO = 'NEO_CRO',

  CRO_USDC = 'CRO_USDC',
}
