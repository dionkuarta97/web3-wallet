import axios, { AxiosError } from 'axios';
import { ARISE_BACKEND_BASE_URL } from '@env';

export enum NetworkType {
  EVM = 'EVM',
  SOLANA = 'SOLANA'
}

export interface SaveWalletPayload {
  name: string;
  user_uuid: string;
  address: string;
  network_type: NetworkType;
  hd_wallet_index: number;
}

export const getOrSaveWallet = async (payload: SaveWalletPayload) => {
  const { data } = await axios.get(`${ARISE_BACKEND_BASE_URL}/v1/wallets`, {
    params: {
      page: 1,
      limit: 10,
      user_uuid: payload.user_uuid,
      address: payload.address,
    }
  });

  let existingWallet = data.data.records.find((x: any) => { 
    return String(x.address).toLowerCase() === payload.address.toLowerCase()
  });

  if (!existingWallet) {
    const { data } = await axios.post(`${ARISE_BACKEND_BASE_URL}/v1/wallets`, payload);
    existingWallet = data.data;
  }

  return existingWallet;
}