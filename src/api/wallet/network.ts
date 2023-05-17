type Network = {
  name: string;
  slug: string;
  chainId: string;
  coinGeckoId: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
    wrappedTokenAddress: string;
  };
};

export const networks: Network[] = [
  {
    name: 'Ethereum Mainnet',
    slug: 'ethereum',
    chainId: '0x1',
    coinGeckoId: 'ethereum',
    rpcUrl: 'https://eth.llamarpc.com',
    blockExplorerUrl: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      wrappedTokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    }
  },
  {
    name: 'Polygon',
    slug: 'polygon',
    coinGeckoId: 'polygon-pos',
    chainId: '0x89',
    rpcUrl: 'https://polygon.llamarpc.com',
    blockExplorerUrl: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
      wrappedTokenAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
    }
  },
  {
    name: 'BNB Smart Chain',
    coinGeckoId: 'binance-smart-chain',
    slug: 'bsc',
    chainId: '0x38',
    rpcUrl: 'https://bsc.publicnode.com',
    blockExplorerUrl: 'https://bscscan.com',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
      wrappedTokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    }
  },
  {
    name: 'Arbitrum One',
    slug: 'arbitrum',
    chainId: '0xa4b1',
    coinGeckoId: 'arbitrum-one',
    rpcUrl: 'https://endpoints.omniatech.io/v1/arbitrum/one/public',
    blockExplorerUrl: 'https://arbiscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      wrappedTokenAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
    }
  },
  {
    name: 'Avalanche',
    slug: 'avalanche',
    coinGeckoId: 'avalanche',
    chainId: '0xa86a',
    rpcUrl: 'https://avalanche-c-chain.publicnode.com',
    blockExplorerUrl: 'https://cchain.explorer.avax.network/',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
      wrappedTokenAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'
    }
  },
  {
    name: 'Fantom',
    slug: 'fantom',
    coinGeckoId: 'fantom',
    chainId: '0xfa',
    rpcUrl: 'https://rpcapi.fantom.network',
    blockExplorerUrl: 'https://ftmscan.com',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
      wrappedTokenAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83'
    }
  },
  {
    name: 'Cronos Mainnet Beta',
    slug: 'cronos',
    coinGeckoId: 'cronos',
    chainId: '0x19',
    rpcUrl: 'https://cronos-evm.publicnode.com',
    blockExplorerUrl: 'https://cronoscan.com/',
    nativeCurrency: {
      name: 'Cronnos',
      symbol: 'CRO',
      decimals: 18,
      wrappedTokenAddress: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23'
    }
  },
  {
    name: 'Goerli',
    slug: 'goerli',
    chainId: '0x5',
    coinGeckoId: 'tesnet',
    rpcUrl: 'https://goerli.blockpi.network/v1/rpc/public',
    blockExplorerUrl: 'https://goerli.etherscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      wrappedTokenAddress: 'tesnet'
    }
  },
  {
    name: 'Sepolia',
    slug: 'sepolia',
    coinGeckoId: 'tesnet',
    chainId: '0xaa36a7',
    rpcUrl: 'https://rpc.sepolia.org',
    blockExplorerUrl: 'https://sepolia.etherscan.io/',
    nativeCurrency: {
      name: 'Sepolia',
      symbol: 'ETH',
      decimals: 18,
      wrappedTokenAddress: 'tesnet'
    }
  },
  {
    name: 'Polygon Mumbai Testnet',
    slug: 'mumbai',
    coinGeckoId: 'tesnet',
    chainId: '0x13881',
    rpcUrl: 'https://polygon-mumbai.blockpi.network/v1/rpc/public',
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
      wrappedTokenAddress: 'tesnet'
    }
  },
  {
    name: 'BNB Smart Chain Testnet',
    slug: 'bsc_testnet',
    coinGeckoId: 'tesnet',
    chainId: '0x61',
    rpcUrl: 'https://data-seed-prebsc-2-s1.binance.org:8545',
    blockExplorerUrl: 'https://testnet.bscscan.com',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
      wrappedTokenAddress: 'tesnet'
    }
  }
];
