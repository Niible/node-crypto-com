import {
  BookParams,
  TickerParams,
  TradesParams,
  CandlestrickParams,
  PublicMethod,
  Response,
  GetInstrumentsResponse,
  GetBookResponse,
  GetTickerResponse,
  GetTradesResponse,
  GetCandlestickResponse,
} from '../../types/crypto.h';
import { CryptoApiBase } from './crypto.api.base';

export class CryptoPublicApi extends CryptoApiBase {
  public async getInstruments(): Promise<Response<GetInstrumentsResponse>> {
    return this.get(
      PublicMethod['get-instruments'],
      { axios: this.createRateLimit(100, 3) },
    ) as Promise<Response<GetInstrumentsResponse>>;
  }

  public async getBook(params: BookParams): Promise<Response<GetBookResponse>> {
    return this.get(
      PublicMethod['get-book'],
      {
        ...params,
        axios: this.createRateLimit(1000, 100),
      },
    ) as Promise<Response<GetBookResponse>>;
  }

  public async getTicker(params: TickerParams): Promise<Response<GetTickerResponse>> {
    return this.get(
      PublicMethod['get-ticker'],
      {
        ...params,
        axios: this.createRateLimit(1000, 100),
      },
    ) as Promise<Response<GetTickerResponse>>;
  }

  public async getTrades(params: TradesParams): Promise<Response<GetTradesResponse>> {
    return this.get(
      PublicMethod['get-trades'],
      {
        ...params,
        axios: this.createRateLimit(1000, 100),
      },
    ) as Promise<Response<GetTradesResponse>>;
  }

  public async getCandlestick(
    params: CandlestrickParams,
  ): Promise<Response<GetCandlestickResponse>> {
    return this.get(
      PublicMethod['get-candlestick'],
      {
        ...params,
        axios: this.createRateLimit(100, 3),
      },
    ) as Promise<Response<GetCandlestickResponse>>;
  }
}
