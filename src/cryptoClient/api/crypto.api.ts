import { CryptoPublicApi } from './crypto.api.public';
import { CryptoPrivateApi } from './crypto.api.private';

export class CryptoApi {
  public public: CryptoPublicApi;

  public private: CryptoPrivateApi;

  constructor(apiKey?: string, apiSecret?: string) {
    this.public = new CryptoPublicApi(apiKey, apiSecret);
    this.private = new CryptoPrivateApi(apiKey, apiSecret);
  }
}
