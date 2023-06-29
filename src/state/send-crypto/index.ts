import { atom } from 'jotai';
import { PublicWallet, TokenType, Wallet } from '../wallet/walletTypes';
import { Network } from '../../api/networks';

interface SendCryptoState {
  network?: Network;
  senderWallet?: Wallet;
  destinationWallet?: PublicWallet;
  token?: TokenType;
  amount?: string;
  networkFeeToken?: TokenType;
  networkFee?: string;
}

export const sendCryptoStateAtom = atom<SendCryptoState>({});
sendCryptoStateAtom.debugLabel = 'sendCryptoStateAtom';
