import {
  BookParams,
  TickerParams,
  TradesParams,
  CandlestrickParams,
  PublicMethod,
  Response,
} from '../../types/crypto.h';
import { CryptoApiBase } from './crypto.api.base';

export class CryptoPublicApi extends CryptoApiBase {
  public async getInstruments(): Promise<Response> {
    return this.get(PublicMethod['get-instruments'], { axios: this.createRateLimit(100, 3) });
  }

  public async getBook(params: BookParams): Promise<Response> {
    return this.get(PublicMethod['get-book'], { ...params, axios: this.createRateLimit(1000, 100) });
  }

  public async getTicker(params: TickerParams): Promise<Response> {
    return this.get(PublicMethod['get-ticker'], { ...params, axios: this.createRateLimit(1000, 100) });
  }

  public async getTrades(params: TradesParams): Promise<Response> {
    return this.get(PublicMethod['get-trades'], { ...params, axios: this.createRateLimit(1000, 100) });
  }

  public async getCandlestick(params: CandlestrickParams): Promise<Response> {
    return this.get(PublicMethod['get-candlestick'], { ...params, axios: this.createRateLimit(100, 3) });
  }
}
