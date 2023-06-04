import { atomWithReducer } from 'jotai/utils';
import { InitialWallet } from './walletTypes';
import { walletAction } from './walletAction';
import { checkStorageWallet } from './walletHelpers';

// TODO: Improve jotai storage with mmkv https://github.com/mrousavy/react-native-mmkv/blob/master/docs/WRAPPER_JOTAI.md

let temp: InitialWallet['wallets'] = checkStorageWallet('wallets', [], 'string');

const initialWallet: InitialWallet = {
  newWallet: checkStorageWallet('newWallet', null, 'string'),
  walletName: '',
  wallets: temp.sort((a, b) => (b.createdAt.valueOf() > a.createdAt.valueOf() ? 1 : -1))
};

export const walletReducer = atomWithReducer(initialWallet, walletAction);
