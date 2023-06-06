import { NewWallet } from '../../api/wallet';

export type TokenType = {
  token_address: string;
  name: string;
  symbol: string;
  logo: string | null;
  balance: string;
  idrPrice: number;
  possible_spam: boolean;
};

export type NetworkType = {
  networkName: string;
  name: string;
  slug: string;
  balance: string;
  symbol: string;
  idrPrice: number;
  tokens: TokenType[];
};

export type Wallet = {
  walletName: string;
  walletAddress: string;
  walletPhrase: string;
  walletPrivateKey: string;
  idrAsset: number;
  networks: NetworkType[];
  isNew: boolean;
  createdAt: Number;
};

export type InitialWallet = {
  newWallet: NewWallet | null;
  walletName: string;
  wallets: Wallet[];
  ariseWallet: Wallet | null;
};
