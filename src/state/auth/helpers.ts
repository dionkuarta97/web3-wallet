import { storage } from '../storage';

type Keys = 'isLogin' | 'firstOpen' | 'userInfo';

export const checkStorage = (key: Keys, val: any, type: 'string' | 'boolean') => {
  let temp: any = null;
  if (type === 'boolean') {
    return storage.getBoolean(key) ?? val;
  } else if (type === 'string') {
    temp = storage.getString(key);

    if (temp) return JSON.parse(temp);
    else return val;
  }
};

export const setStorage = (key: Keys, newVal: any) => {
  storage.set(key, newVal);
};
