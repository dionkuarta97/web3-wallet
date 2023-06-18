type token = {
  name: string;
  symbol: string;
  balance: number;
  network: string;
  price: number;
  logo: string;
};

export const tokens: token[] = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    balance: 0.2399977,
    network: 'native balance',
    price: 25871339,
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025'
  },
  {
    name: 'Tether USD',
    symbol: 'USDT',
    balance: 58.239,
    network: 'token erc20',
    price: 14950.91,
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=025'
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    balance: 42.239,
    network: 'token erc20',
    price: 14950.91,
    logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=025'
  },
  {
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    balance: 5.43,
    network: 'token erc20',
    price: 3679956,
    logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=025'
  },
  {
    name: 'TRON',
    symbol: 'TRX',
    balance: 543.43,
    network: 'token erc20',
    price: 1065.77,
    logo: 'https://cryptologos.cc/logos/tron-trx-logo.png?v=025'
  },
  {
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    balance: 0.43,
    network: 'token erc20',
    price: 396627427,
    logo: 'https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png?v=025'
  }
];
