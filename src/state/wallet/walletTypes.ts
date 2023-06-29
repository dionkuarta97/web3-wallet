import { NewWallet } from '../../api/wallet';
import { TokenType as TokenTypeEnum } from '../../api/tokens';

export type TokenType = {
  tokenAddress: string;
  name: string;
  symbol: string;
  logo: string | null;
  balance: string;
  decimals: number;
  idrPrice: number;
  possibleSpam: boolean;
  tokenType: TokenTypeEnum;
};

export type NetworkType = {
  // networkName: string;
  name: string;
  slug: string;
  // balance: string;
  // symbol: string;
  // idrPrice: number;
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

export type PublicWallet = {
  name?: string;
  address: string;
}

export type InitialWallet = {
  newWallet: NewWallet | null;
  walletName: string;
  wallets: Wallet[];
  ariseWallet: Wallet | null;
};
