import { setStorageWallet } from './walletHelpers';
import { InitialWallet } from './walletTypes';

type Action =
  | { type: 'setNewWallet'; payload: InitialWallet['newWallet'] }
  | { type: 'setWalletName'; payload: InitialWallet['walletName'] }
  | { type: 'setWallets'; payload: InitialWallet['wallets'] };

export const walletAction = (prev: any, action: Action) => {
  let newVal: InitialWallet = prev;
  if (action.type === 'setNewWallet') {
    newVal = { ...prev, newWallet: action.payload };
    setStorageWallet('newWallet', JSON.stringify(action.payload));
    return newVal;
  } else if (action.type === 'setWalletName') {
    newVal = { ...prev, walletName: action.payload };
    return newVal;
  } else if (action.type === 'setWallets') {
    newVal = { ...prev, wallets: action.payload };
    setStorageWallet('wallets', JSON.stringify(action.payload));
    return newVal;
  }
};
