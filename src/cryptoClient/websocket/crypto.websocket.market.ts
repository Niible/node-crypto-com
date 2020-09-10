import WebSocket from 'ws';
import { CryptoWebsocketBase } from './crypto.websocket.base';
import { InstrumentName, Period } from '../../types/crypto.h';

export class CryptoWebsocketMarket extends CryptoWebsocketBase {
  constructor(apiKey: string, apiSecret: string) {
    super(apiKey, apiSecret, new WebSocket('wss://stream.crypto.com/v2/market'));
    this.setup();
  }

  bookSubscribe(instrumentName: InstrumentName | string, depth = 10): void {
    const channel = `book.${instrumentName}.${depth}`;
    this.subscribe([channel]);
  }

  tickerSubcribe(instrumentName?: InstrumentName | string): void {
    let channel = 'ticker';
    if (instrumentName) channel += `.${instrumentName}`;
    this.subscribe([channel]);
  }

  tradeSubcribe(instrumentName?: InstrumentName | string): void {
    let channel = 'trade';
    if (instrumentName) channel += `.${instrumentName}`;
    this.subscribe([channel]);
  }

  candlestick(instrumentName: InstrumentName | string, period: Period): void {
    const channel = `candlestick.${period}.${instrumentName}`;
    this.subscribe([channel]);
  }
}
