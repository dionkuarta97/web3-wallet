import { setStorageToken } from './tokenHelpers';
import { initialToken } from './tokenTypes';

type TokenAction = {
  type: 'setListToken';
  payload: initialToken['listTokens'];
};

export const tokenAction = (prev: initialToken, action: TokenAction) => {
  if (action.type === 'setListToken') {
    let newVal = { ...prev, listToken: action.payload };
    setStorageToken('listTokens', JSON.stringify(action.payload));
    return newVal;
  }
};
