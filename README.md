# Node crypto.com/exchange API and Websocket

Node module written in typescript wraping the crypto.com exchange API.

# Installation
```
npm install node-crypto-com --save
```

# Usage

## Exchange API

```ts
import { CryptoApi, Coin } from 'node-crypto-com';


async function main() {
  const api = new CryptoApi('apiKey', 'apiSecret');

  const { data, status } = await api.public.getInstruments();
  console.log(data.result);
  /*
  [
    {
      instrument_name: 'BTC_USDT',
      quote_currency: 'USDT',
      base_currency: 'BTC',
      price_decimals: 2,
      quantity_decimals: 6
    },
    {
      instrument_name: 'OMG_USDT',
      quote_currency: 'USDT',
      base_currency: 'OMG',
      price_decimals: 4,
      quantity_decimals: 4
    },
    ...
  ]
  */
  console.log(status); // 200

  const accountSummary = await api.private.getAccountSummary({
    currency: Coin.Cro
  });

  console.log(accountSummary.data.result);
  /*
  {
    accounts: [
      {
        balance: 661.95151801,
        available: 661.95151801,
        order: 0,
        stake: 0,
        currency: 'CRO'
      }
    ]
  }
  */

}

main();
```

For `api.public.***` you do not need API's keys.

For `api.private.***` you will need apiKey and apiSecret. 


## Exchange Websocket

```ts
import { CryptoWebsocket, InstrumentName } from 'node-crypto-com';


async function main() {
  const ws = new CryptoWebsocket('apiKey', 'apiSecret');

  await ws.market.waitWebsocket();
  ws.market.bookSubscribe(InstrumentName.CRO_USDT, 10);
  while (true) {
    const response = await ws.market.getNextResponse();
    console.log(response.result);
    /*
    {
      instrument_name: 'CRO_USDT',
      subscription: 'book.CRO_USDT.10',
      channel: 'book',
      depth: 10,
      data: [ { bids: [Array], asks: [Array], t: 1599760003788 } ]
    }
    {
      instrument_name: 'CRO_USDT',
      subscription: 'book.CRO_USDT.10',
      channel: 'book',
      depth: 10,
      data: [ { bids: [Array], asks: [Array], t: 1599760005028 } ]
    }
    {
      instrument_name: 'CRO_USDT',
      subscription: 'book.CRO_USDT.10',
      channel: 'book',
      depth: 10,
      data: [ { bids: [Array], asks: [Array], t: 1599760006244 } ]
    }
    */
  }
}


main();
```

Do not forget to `waitWebsocket()` before any subscription ! 

```ts
import { CryptoWebsocket } from 'node-crypto-com';


async function main() {
  const ws = new CryptoWebsocket('apiKey', 'apiSecret');

  await ws.user.waitWebsocket();
  ws.user.authenticate();
  ws.user.getOrderDetail({
    order_id: '735251952879380642'
  });
  while (true) {
    const response = await ws.user.getNextResponse();
    console.log(response.result);
    /*
    {
      trade_list: [
        {
          side: 'BUY',
          fee: 0,
          trade_id: '735251953117613760',
          instrument_name: 'CRO_BTC',
          create_time: 1599749015742,
          traded_price: 0.00001465,
          traded_quantity: 462,
          fee_currency: 'CRO',
          order_id: '735251952879380642'
        }
      ],
      order_info: {
        status: 'FILLED',
        side: 'BUY',
        price: 0,
        quantity: 0,
        order_id: '735251952879380642',
        client_oid: '',
        create_time: 1599749015735,
        update_time: 1599749015741,
        type: 'MARKET',
        instrument_name: 'CRO_BTC',
        avg_price: 0.00001465,
        cumulative_quantity: 462,
        cumulative_value: 0.0067683,
        fee_currency: 'CRO',
        exec_inst: '',
        time_in_force: 'IMMEDIATE_OR_CANCEL'
      }
    }
    */
  }
}


main()
```

For user websocket do not forget to `waitWebsocket()` AND `authenticate()` !!


```ts
import { CryptoWebsocket } from 'node-crypto-com'


async function main() {
  const ws = new CryptoWebsocket('apiKey', 'apiSecret');

  await ws.user.waitWebsocket()
  ws.market.subscribe(['user.balance'])
  ws.user.unsubscribe(['user.balance'])
}

```

You can subscribe manually to channels and unsubscribe too.


# Documentation

COMMING SOON !