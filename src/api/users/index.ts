import axios from 'axios';
import { ARISE_BACKEND_BASE_URL } from '@env';

export enum LoginMethod {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}

const parseLoginMethod = (loginMethod: string) => {
  switch (loginMethod) {
    case 'google':
      return LoginMethod.GOOGLE;
    case 'facebook':
      return LoginMethod.FACEBOOK;
    default:
      throw new Error('Invalid login method');
  }
} 

// This API is only used temporarily. It will be removed in the future.
// It is used to create a user in the database.
export const createUser = async (mainWalletAddress: string, loginMethod: string) => {
  const { data } = await axios.post(`${ARISE_BACKEND_BASE_URL}/v1/users`, {
    main_wallet_address: mainWalletAddress,
    login_method: parseLoginMethod(loginMethod),
  });
  return data;
}

export const getUser = async (mainWalletAddress: string, loginMethod: string) => {
  const { data } = await axios
    .get(`${ARISE_BACKEND_BASE_URL}/v1/users`, {
      params: {
        page: 1,
        limit: 10,
        main_wallet_address: mainWalletAddress,
        login_method: parseLoginMethod(loginMethod),
      }
    });
  if (data.data.records.length === 0) {
    return null;
  }
  return data.data.records[0];
}