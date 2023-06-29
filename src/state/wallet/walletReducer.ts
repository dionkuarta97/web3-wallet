import { atomWithReducer } from 'jotai/utils';
import { WritableAtom, atom } from 'jotai';
import { InitialWallet, Wallet } from './walletTypes';
import { walletAction } from './walletAction';
import { checkStorageWallet } from './walletHelpers';

// TODO: Improve jotai storage with mmkv https://github.com/mrousavy/react-native-mmkv/blob/master/docs/WRAPPER_JOTAI.md

let temp: InitialWallet['wallets'] = checkStorageWallet('wallets', [], 'string');

const initialWallet: InitialWallet = {
  newWallet: checkStorageWallet('newWallet', null, 'string'),
  walletName: '',
  wallets: temp.sort((a, b) => (b.createdAt.valueOf() > a.createdAt.valueOf() ? 1 : -1)),
  ariseWallet: checkStorageWallet('ariseWallet', null, 'string')
};

export const walletReducer = atomWithReducer(initialWallet, walletAction);
export const walletByAddressAtom = atom(
  null as Wallet | null,
  (_get, set, walletAddress: string) => {
    const wallets = _get(walletReducer).wallets;
    const wallet = wallets.find(wallet => wallet.walletAddress === walletAddress);
    if (wallet) {
      set(walletByAddressAtom as any, wallet);
    }
  }
)