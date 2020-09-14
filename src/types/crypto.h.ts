import { AxiosStatic } from 'axios';

export interface Options {
  axios?: AxiosStatic
}

export type Params =
  (
    WebsocketParams
  ) &
  (
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
    GetOpenOrdersParams
  );

export interface TradesParams {
  instrument_name?: InstrumentName
}

export interface TickerParams {
  instrument_name?: InstrumentName
}

export interface BookParams {
  instrument_name: InstrumentName
  depth?: string // up to 150
}

export interface GetTradesParams {
  instrument_name?: InstrumentName,
  start_ts?: number,
  end_ts?: number,
  page_size?: number,
  page?: number,
}

export interface GetOrderDetailParams {
  order_id: string
}

export interface GetOpenOrdersParams {
  instrument_name?: InstrumentName
  page_size?: number
  page?: number
}

export interface GetOrderHistory {
  instrument_name?: InstrumentName
  start_ts?: number
  end_ts?: number // max between start and end is 24 hours
  page_size?: number
  page?: number
}

export interface CancelAllOrdersParams {
  instrument_name: InstrumentName
}

export interface CancelOrderParams {
  instrument_name: InstrumentName
  order_id: string
}

export interface CreateOrderParams {
  instrument_name: InstrumentName
  side: OrderSide
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
  instrument_name: InstrumentName
  timeframe: Interval
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

export interface Response<T> {
  status: number
  data: T
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

export interface Result<T> {
  id: number
  method: string
  code: number
  result: T
  message?: string // For server or error messages
  original?: string // Original request as a string, for error cases
}

export enum Interval {
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

export enum Currency {
  BTC = 'BTC',
  ETC = 'ETC',
  USDT = 'USDT',
  USDC = 'USDC',
  DAI = 'DAI',
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
  PAXG = 'PAXG',
  BAT = 'BAT',
  COMP = 'COMP',
  MANA = 'MANA',
  OMG = 'OMG',
  QTUM = 'QTUM',
  CELR = 'CELR',
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
  COMP_BTC = 'COMP_BTC',
  OMG_BTC = 'OMG_BTC',
  MANA_BTC = 'MANA_BTC',

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
  DAI_USDT = 'DAI_USDT',
  PAXG_USDT = 'PAXG_USDT',
  BAT_USDT = 'BAT_USDT',
  COMP_USDT = 'COMP_USDT',
  OMG_USDT = 'OMG_USDT',
  MANA_USDT = 'MANA_USDT',
  QTUM_USDT = 'QTUM_USDT',
  CELR_USDT = 'CELR_USDT',

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
  DAI_CRO = 'DAI_CRO',
  PAXG_CRO = 'PAXG_CRO',
  BAT_CRO = 'BAT_CRO',
  COMP_CRO = 'COMP_CRO',
  OMG_CRO = 'OMG_CRO',
  MANA_CRO = 'MANA_CRO',
  QTUM_CRO = 'QTUM_CRO',
  CELR_CRO = 'CELR_CRO',

  CRO_USDC = 'CRO_USDC',
}

export interface ResponseDefaultAttribute {
  id: number,
  method: string,
  code: number,
}

export interface GetInstrumentsResponse extends ResponseDefaultAttribute {
  result: InstrumentsResult
}

export interface InstrumentsResult {
  instruments: Instrument[]
}

export interface Instrument {
  instrument_name: InstrumentName,
  quote_currency: Currency,
  base_currency: Currency,
  price_decimals: number,
  quantity_decimals: number,
}

export interface GetBookResponse extends ResponseDefaultAttribute {
  result: BookResult
}

export interface BookResult {
  data: BookData[]
}

export interface BookData {
  bids: Bids[]
  asks: Asks[]
  t: number
}

type Bids = [number, number];
type Asks = [number, number];

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

export interface TradeResult {
  p: number
  q: number
  s: string
  d: number
  t: number
  dataTime: number
}

export interface TradesResult {
  data: TradeResult[]
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
  accounts: Account[]
}

export interface Account {
  balance: number
  available: number
  order: number
  stake: number
  currency: Currency
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

export interface Order {
  status: OrderStatus
  side: OrderSide
  price: number
  quantity: number
  order_id: string
  client_oid: string
  create_time: number
  update_time: number
  type: OrderType
  instrument_name: InstrumentName
  cumulative_quantity: number
  cumulative_value: number
  avg_price: number
  fee_currency: Currency
  time_in_force: TimeInForce
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

export interface TradeList {
  side: OrderSide
  instrument_name: InstrumentName
  fee: number
  trade_id: string
  create_time: number
  traded_price: number
  traded_quantity: number
  fee_currency: Currency
  order_id: string
}

export interface OrderInfo {
  status: OrderStatus
  side: OrderSide
  order_id: string
  client_oid: string
  create_time: number
  update_time: number
  type: OrderType
  instrument_name: InstrumentName
  cumulative_quantity: number
  cumulative_value: number
  avg_price: number
  fee_currency: Currency
  time_in_force: TimeInForce
  exec_inst: ExecInst
}

export enum ExecInst {
  POST_ONLY = 'POST_ONLY'
}

export interface GetMyTradesResponse extends ResponseDefaultAttribute {
  result: MyTradesResult
}

export interface MyTradesResult {
  trade_list: TradeList[]
}
