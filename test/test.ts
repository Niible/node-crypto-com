import 'mocha';
import { CryptoApi, CryptoPrivateApi, CryptoPublicApi } from '../src/cryptoClient/api';
import {
  InstrumentName, OrderSide, OrderType, Interval,
} from '../src/types/crypto.h';
import { CryptoWebsocket, CryptoWebsocketUser, CryptoWebsocketMarket } from '../src/cryptoClient/websocket';
import { config } from 'dotenv';
import { expect } from 'chai';

config();

describe('Test CryptoApi Instance',
  () => {
    const cryptoApi = new CryptoApi(process.env.API_KEY, process.env.SECRET_KEY);

    it('cryptoApi should be instance of CryptoApi', () => {
      expect(cryptoApi).to.be.instanceof(CryptoApi);
    });

    it('cryptoApi.private should be instance of CryptoPrivateApi', () => {
      expect(cryptoApi.private).to.be.instanceof(CryptoPrivateApi);
    });
    it('cryptoApi.public should be instance of CryptoPublicApi', () => {
      expect(cryptoApi.public).to.be.instanceof(CryptoPublicApi);
    });
  });

describe('Test CryptoApi.public',
  () => {
    const cryptoApi = new CryptoApi();
    it('getInstruments should return status 200, code 0 and data.result.instruments as array', async () => {
      const { data, status } = await cryptoApi.public.getInstruments();
      expect(data.code).to.be.equal(0);
      expect(status).to.equal(200);
      expect(data.result.instruments).to.be.instanceof(Array);
    });

    it('getTicker should return status 200, code 0 and data.result.data as object if instrument_name set', async () => {
      const { data, status } = await cryptoApi.public.getTicker(
        { instrument_name: InstrumentName.CRO_USDT },
      );
      expect(data.code).to.be.equal(0);
      expect(status).to.equal(200);
      expect(data.result.data).to.be.instanceof(Object);
    });

    it('getTicker should return status 200, code 0 and data.result.data as object if instrument_name not set', async () => {
      const { data, status } = await cryptoApi.public.getTicker({});
      expect(data.code).to.be.equal(0);
      expect(status).to.equal(200);
      expect(data.result.data).to.be.instanceof(Array);
    });

    it('getBook should return status 200, code 0 and data.result.data[0].bids and asks as array and t as timestamp', async () => {
      const { data, status } = await cryptoApi.public.getBook({ instrument_name: InstrumentName.CRO_USDT, depth: '2' });
      expect(data.code).to.be.equal(0);
      expect(status).to.equal(200);
      expect(data.result.data).to.be.instanceof(Array);
      expect(data.result.data[0].bids).to.be.instanceof(Array);
      expect(data.result.data[0].asks).to.be.instanceof(Array);
      expect(data.result.data[0].t).to.be.a('number');
    });

    it('getTrades should return a status 200, code 0 and data.result as object if instrument_name set', async () => {
      const { data, status } = await cryptoApi.public.getTrades(
        { instrument_name: InstrumentName.CRO_USDT },
      );
      expect(data.code).to.be.equal(0);
      expect(status).to.equal(200);
      expect(data.result).to.be.instanceof(Object);
      expect(data.result.data).to.be.instanceof(Array);
    });

    it('getTrades should return a status 200, code 0 and data.result.data as array if instrument_name not set', async () => {
      const { data, status } = await cryptoApi.public.getTrades({});
      expect(data.code).to.be.equal(0);
      expect(status).to.equal(200);
      expect(data.result).to.be.instanceof(Object);
      expect(data.result.data).to.be.instanceof(Array);
    });

    it('getCandlestick should return a status 200, code 0 and data.result.data as array', async () => {
      const { data, status } = await cryptoApi.public.getCandlestick(
        { instrument_name: InstrumentName.CRO_USDT, timeframe: Interval.Minutes_5 },
      );
      expect(data.code).to.be.equal(0);
      expect(status).to.equal(200);
      expect(data.result.data).to.be.instanceof(Array);
    });
  });

describe('Test CryptoApi.private',
  () => {
    const cryptoApi = new CryptoApi(process.env.API_KEY, process.env.SECRET_KEY);

    it('getAccountSummary should return a status 200, a code 0 and data.result.accounts as array', async () => {
      const { data, status } = await cryptoApi.private.getAccountSummary({});
      expect(data.code).to.be.equal(0);
      expect(status).to.equal(200);
      expect(data.result.accounts).to.be.instanceof(Array);
    });

    it('getOpenOrders should return status 200, code 0 and data.result.order_list as array', async () => {
      const { data, status } = await cryptoApi.private.getOpenOrders(
        { instrument_name: InstrumentName.CRO_USDT },
      );
      expect(data.code).to.be.equal(0);
      expect(status).to.equal(200);
      expect(data.result.count).to.be.gte(0);
      expect(data.result.order_list).to.be.instanceof(Array);
    });

    it('getOrderDetail should return status 200, code 0, data.result.order_info as object and data.result.trade_list as array if there is one openOrders', async () => {
      const { data: d } = await cryptoApi.private.getOpenOrders(
        { instrument_name: InstrumentName.CRO_USDT },
      );
      if (d.result.order_list.length) {
        const { data, status } = await cryptoApi.private.getOrderDetail(
          { order_id: d.result.order_list[0].order_id },
        );
        expect(data.code).to.be.equal(0);
        expect(status).to.equal(200);
        expect(data.result.trade_list).to.be.instanceof(Array);
        expect(data.result.order_info).to.be.instanceof(Object);
      }
    });

    it('getOrderHistory should return status 200, code 0 and data.result.order_list as array', async () => {
      const { data, status } = await cryptoApi.private.getOrderHistory(
        { instrument_name: InstrumentName.CRO_USDT, page: 0, page_size: 2 },
      );
      expect(data.code).to.be.equal(0);
      expect(status).to.equal(200);
      expect(data.result.order_list).to.be.instanceof(Array);
    });

    it('getTrades should return status 200, code 0 and data.result.trade_list as array', async () => {
      const { data, status } = await cryptoApi.private.getTrades(
        { instrument_name: InstrumentName.CRO_USDT },
      );
      expect(data.code).to.be.equal(0);
      expect(status).to.equal(200);
      expect(data.result.trade_list).to.be.instanceof(Array);
    });

    if (process.env.BUY_TEST === 'true') {
      it('createOrder should return status 200, code 0 and data.result.order_id and cancelOrder should return status 200 and code 0 if account get sufficient CRO amount ', async () => {
        const { data, status } = await cryptoApi.private.createOrder({
          instrument_name: InstrumentName.CRO_USDT,
          side: OrderSide.BUY,
          type: OrderType.LIMIT,
          quantity: 10,
          price: 0.0001,
        });
        expect(data.code).to.be.equal(0);
        expect(status).to.equal(200);
        expect(data.result.order_id).to.be.a('string');
        const { data: d, status: s } = await cryptoApi.private.cancelOrder(
          {
            instrument_name: InstrumentName.CRO_USDT,
            order_id: data.result.order_id,
          },
        );
        expect(d.code).to.be.equal(0);
        expect(s).to.equal(200);
      });

      it('cancelAllOrders should return status 200 and code 0', async () => {
        const { data, status } = await cryptoApi.private.cancelAllOrders(
          { instrument_name: InstrumentName.ADA_BTC },
        );
        expect(data.code).to.be.equal(0);
        expect(status).to.equal(200);
      });
    }
  });

// describe('Test CryptoWebsocket Instance',
//   function () {
//     const cryptoWs = new CryptoWebsocket(process.env.API_KEY, process.env.SECRET_KEY);

//     it('cryptoWs should be instance of CryptoWebsocket', () => {
//       expect(cryptoWs).to.be.instanceof(CryptoWebsocket);
//     });

//     it('cryptoWs.market should be instance of CryptoWebsocketMarket', () => {
//       expect(cryptoWs.market).to.be.instanceof(CryptoWebsocketMarket);
//     });
//     it('cryptoWs.user should be instance of CryptoWebsocketUser', () => {
//       expect(cryptoWs.user).to.be.instanceof(CryptoWebsocketUser);
//     });
//   });

