import { InitialBottomTypes } from './bottomType';

type action =
  | {
      type: 'setShowWallet';
      payload: InitialBottomTypes['showWallet'];
    }
  | {
      type: 'setTabActive';
      payload: InitialBottomTypes['tabActive'];
    };

export const bottomAction = (prev: any, action: action) => {
  let newVal: InitialBottomTypes = prev;
  if (action.type === 'setShowWallet') {
    newVal = { ...prev, showWallet: action.payload };
    return newVal;
  } else if (action.type === 'setTabActive') {
    newVal = { ...prev, tabActive: action.payload };
    return newVal;
  }
  return newVal;
};
