import { atomWithReducer } from 'jotai/utils';
import { InitialWallet } from './walletTypes';
import { walletAction } from './walletAction';
import { checkStorageWallet } from './walletHelpers';

const initialWallet: InitialWallet = {
  newWallet: checkStorageWallet('newWallet', null, 'string'),
  walletName: '',
  wallets: checkStorageWallet('wallets', [], 'string')
};

export const walletReducer = atomWithReducer(initialWallet, walletAction);
