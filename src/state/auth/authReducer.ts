import { atomWithReducer } from 'jotai/utils';
import { InitialStateTypes } from './authType';
import { authAction } from './authAction';
import { checkStorage } from './helpers';

const initialState: InitialStateTypes = {
  isLogin: checkStorage('isLogin', false, 'boolean'),
  firstOpen: checkStorage('firstOpen', true, 'boolean'),
  userInfo: checkStorage('userInfo', null, 'string'),
  inputPin: null,
  inputRepin: null
};

export const authReducer = atomWithReducer(initialState, authAction);
