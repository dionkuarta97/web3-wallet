import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();

type Keys = 'newWallet' | 'wallets';

export const checkStorageWallet = (key: Keys, val: any, type: 'string') => {
  let temp: any = null;
  if (type === 'string') {
    temp = storage.getString(key);
    if (temp) return JSON.parse(temp);
    else return val;
  }
};

export const setStorageWallet = (key: Keys, newVal: any) => {
  storage.set(key, newVal);
};
