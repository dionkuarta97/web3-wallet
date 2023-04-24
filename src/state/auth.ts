import { atom } from 'jotai';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const isLoginAtom = atom<boolean>(storage.getBoolean('isLogin') ?? false);

export const isLoginAtomWithPersistence = atom(
  (get) => get(isLoginAtom),
  (get, set, newVal: boolean) => {
    set(isLoginAtom, newVal);
    storage.set('isLogin', newVal);
  }
);

export const firstOpenAtom = atom<boolean>(storage.getBoolean('firstOpen') ?? true);

export const firstOpenAtomWithPersistence = atom(
  (get) => get(firstOpenAtom),
  (get, set, newVal: boolean) => {
    set(firstOpenAtom, newVal);
    storage.set('firstOpen', newVal);
  }
);
