import { atomWithReducer } from 'jotai/utils';
import { InitialBottomTypes } from './bottomType';
import { bottomAction } from './bottomAction';

const initialBottom: InitialBottomTypes = {
  showWallet: false,
  tabActive: null
};

export const bottomReducer = atomWithReducer(initialBottom, bottomAction);
