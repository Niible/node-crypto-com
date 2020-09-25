import { CryptoWebsocketBase } from './crypto.websocket.base';
import {
  InstrumentName, Interval,
} from '../../types/crypto.h';

export class CryptoWebsocketMarket extends CryptoWebsocketBase {
  constructor(apiKey: string, apiSecret: string) {
    super(apiKey, apiSecret, 'wss://stream.crypto.com/v2/market');
    this.setup();
  }

  bookSubscribe(instrumentName: InstrumentName | string, depth = 10): string {
    const channel = `book.${instrumentName}.${depth}`;
    this.subscribe(channel);
    return channel;
  }

  tickerSubscribe(instrumentName?: InstrumentName | string): string {
    let channel = 'ticker';
    if (instrumentName) channel += `.${instrumentName}`;
    this.subscribe(channel);
    return channel;
  }

  tradeSubscribe(instrumentName?: InstrumentName | string): string {
    let channel = 'trade';
    if (instrumentName) channel += `.${instrumentName}`;
    this.subscribe(channel);
    return channel;
  }

  candlestickSubscribe(instrumentName: InstrumentName | string, period: Interval): string {
    const channel = `candlestick.${period}.${instrumentName}`;
    this.subscribe(channel);
    return channel;
  }
}
