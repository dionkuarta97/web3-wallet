import { setStorage } from './helpers';
import { InitialStateTypes } from './authType';

type Actions =
  | {
      type: 'setIsLogin';
      payload: InitialStateTypes['isLogin'];
    }
  | { type: 'setFirstOpen'; payload: InitialStateTypes['firstOpen'] }
  | { type: 'setUserInfo'; payload: InitialStateTypes['userInfo'] }
  | { type: 'setPin'; payload: InitialStateTypes['inputPin'] }
  | { type: 'setRePin'; payload: InitialStateTypes['inputRepin'] };

export const authAction = (prev: any, action: Actions) => {
  let newVal: InitialStateTypes = prev;
  if (action.type === 'setIsLogin') {
    newVal = { ...prev, isLogin: action.payload };
    setStorage('isLogin', action.payload);
    return newVal;
  } else if (action.type === 'setFirstOpen') {
    setStorage('firstOpen', action.payload);
    newVal = { ...prev, firstOpen: action.payload };
    return newVal;
  } else if (action.type === 'setUserInfo') {
    setStorage('userInfo', JSON.stringify(action.payload));
    newVal = { ...prev, userInfo: action.payload };
    return newVal;
  } else if (action.type === 'setPin') {
    newVal = { ...prev, inputPin: action.payload };
    return newVal;
  } else if (action.type === 'setRePin') {
    newVal = { ...prev, inputRepin: action.payload };
    return newVal;
  }
  return newVal;
};
