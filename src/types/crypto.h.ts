export enum TimeInForce {
  GOOD_TILL_CANCEL = 'GOOD_TILL_CANCEL',
  FILL_OR_KILL = 'FILL_OR_KILL',
  IMMEDIATE_OR_CANCEL = 'IMMEDIATE_OR_CANCEL',
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

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
  STOP_LOSS = 'STOP_LOSS',
  STOP_LIMIT = 'STOP_LIMIT',
  TAKE_PROFIT = 'TAKE_PROFIT',
  TAKE_PROFIT_LIMIT = 'TAKE_PROFIT_LIMIT',
}

export enum OrderStatus {
  ACTIVE = 'ACTIVE',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
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

export interface Instrument {
  instrument_name: InstrumentName,
  quote_currency: Currency,
  base_currency: Currency,
  price_decimals: number,
  quantity_decimals: number,
}

export interface BookData {
  bids: Bids[]
  asks: Asks[]
  t: number
}

type Bids = [number, number, number];
type Asks = [number, number, number];

export interface AccountSummary {
  balance: number
  available: number
  order: number
  stake: number
  currency: Currency
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
