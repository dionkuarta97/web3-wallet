import { setStorageWallet } from './walletHelpers';
import { InitialWallet, Wallet } from './walletTypes';

type Action =
  | { type: 'setNewWallet'; payload: InitialWallet['newWallet'] }
  | { type: 'setWalletName'; payload: InitialWallet['walletName'] }
  | { type: 'setWallets'; payload: InitialWallet['wallets'] }
  | { type: 'setWalletByAddress'; payload: Wallet }
  | { type: 'deleteWalletByAddress'; payload: string }
  | { type: 'addWallet'; payload: Wallet }
  | { type: 'setAriseWallet'; payload: Wallet };

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
    newVal = {
      ...prev,
      wallets: action.payload
    };
    setStorageWallet('wallets', JSON.stringify(action.payload));
    return newVal;
  } else if (action.type === 'setWalletByAddress') {
    let index = newVal.wallets.findIndex((el) => el.walletAddress === action.payload.walletAddress);
    let temp = newVal.wallets;
    temp.splice(index, 1, action.payload);
    setStorageWallet('wallets', JSON.stringify(temp));
    newVal = {
      ...prev,
      wallets: temp
    };
    return newVal;
  } else if (action.type === 'addWallet') {
    let temp = [action.payload, ...newVal.wallets];
    setStorageWallet('wallets', JSON.stringify(temp));
    newVal = {
      ...prev,
      wallets: temp
    };
    return newVal;
  } else if (action.type === 'deleteWalletByAddress') {
    let temp = prev.wallet.wallets?.filter((val: Wallet) => val.walletAddress !== action.payload);
    setStorageWallet('wallets', JSON.stringify(temp));
    newVal = {
      ...prev,
      wallets: temp
    };
    return newVal;
  } else if (action.type === 'setAriseWallet') {
    setStorageWallet('ariseWallet', JSON.stringify(action.payload));
    newVal = {
      ...prev,
      ariseWallet: action.payload
    };
    return newVal;
  }
};
