import { NewWallet } from '../../api/wallet';

type Wallet = {
  walletName: string;
  walletAddress: string;
  walletPhrase: string;
  walletPrivateKey: string;
  isNew: boolean;
};

export type InitialWallet = {
  newWallet: NewWallet | null;
  walletName: string;
  wallets: Wallet[];
};
