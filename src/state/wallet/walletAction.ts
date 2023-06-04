import { setStorageWallet } from './walletHelpers';
import { InitialWallet, Wallet } from './walletTypes';

type Action =
  | { type: 'setNewWallet'; payload: InitialWallet['newWallet'] }
  | { type: 'setWalletName'; payload: InitialWallet['walletName'] }
  | { type: 'setWallets'; payload: InitialWallet['wallets'] }
  | { type: 'setWalletByAddress'; payload: Wallet }

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
    let sort = action.payload.sort((a, b) =>
      b.createdAt.valueOf() > a.createdAt.valueOf() ? 1 : -1
    );
    newVal = {
      ...prev,
      wallets: sort
    };
    setStorageWallet('wallets', JSON.stringify(sort));
    return newVal;
  } else if (action.type === 'setWalletByAddress') {
    const walletIndex = prev.wallets.findIndex((wallet: Wallet) => {
      return wallet.walletAddress === action.payload.walletAddress;
    });
    if (walletIndex == -1) {
      return newVal;
    }
    prev.wallets[walletIndex] = action.payload;
    setStorageWallet('wallets', JSON.stringify(prev.wallets));
    return { ...prev, wallets: prev.wallets };
  }
};
