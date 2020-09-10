import { CryptoWebsocketUser } from './crypto.websocket.user';
import { CryptoWebsocketMarket } from './crypto.websocket.market';

export class CryptoWebsocket {
  public user: CryptoWebsocketUser;

  public market: CryptoWebsocketMarket;

  constructor(apiKey?: string, apiSecret?: string) {
    this.user = new CryptoWebsocketUser(apiKey, apiSecret);
    this.market = new CryptoWebsocketMarket(apiKey, apiSecret);
  }
}
