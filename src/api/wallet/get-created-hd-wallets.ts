import axios from 'axios';
import { ARISE_BACKEND_BASE_URL } from '@env';

export interface HDWallet {
  name: string;
  address: string;
  hd_wallet_index: number;
}

/**
 * Get all created HD wallets by user
 * @param userUuid 
 * @returns HDWallet[] sorted by hd_wallet_index ascending
 */
export const getCreatedHdWallets = async (userUuid: string) => {
  const { data } = await axios.get(`${ARISE_BACKEND_BASE_URL}/v1/wallets`, {
    params: {
      page: 1,
      limit: 10,
      user_uuid: userUuid,
    }
  });
  return (data.data.records as HDWallet[])
    .filter((x: any) => x.hd_wallet_index > -1)
    .sort((a: any, b: any) => (b.hd_wallet_index > a.hd_wallet_index ? -1 : 1));
}