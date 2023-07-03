import { storage } from '../storage';

type Keys = 'listTokens';

export const checkStorageToken = (key: Keys, val: any, type: 'string') => {
  let temp: any = null;
  if (type === 'string') {
    temp = storage.getString(key);
    if (temp) return JSON.parse(temp);
    else return val;
  }
};

export const setStorageToken = (key: Keys, newVal: any) => {
  storage.set(key, newVal);
};
