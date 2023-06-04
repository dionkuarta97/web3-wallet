import { MMKV } from 'react-native-mmkv';
import { initializeMMKVFlipper } from "react-native-mmkv-flipper-plugin";
const _storage = new MMKV();

// add this line inside your App.tsx
if (__DEV__) {
  initializeMMKVFlipper({ default: _storage });
}

export const storage = _storage;