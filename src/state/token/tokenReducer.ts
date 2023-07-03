import { atomWithReducer } from 'jotai/utils';
import { checkStorageToken } from './tokenHelpers';
import { initialToken } from './tokenTypes';
import { tokenAction } from './tokenAction';

const initialState: initialToken = {
  listTokens: checkStorageToken('listTokens', null, 'string')
};

export const tokenReducer = atomWithReducer(initialState, tokenAction);
