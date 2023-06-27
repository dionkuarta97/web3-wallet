import axios from "axios"
import { ARISE_BACKEND_BASE_URL } from "@env"

export enum TokenType {
  NATIVE = 'NATIVE',
  ERC20 = 'ERC20',
}

export interface Token {
  uuid: string;
  created_at: string,
  updated_at: string,
  deleted_at?: string,
  address: string,
  network: {
      uuid: string,
      created_at: string,
      updated_at: string,
      deleted_at?: string,
      chain_id: number,
      name: string,
      slug: string,
      network_type: string // EVM / SOLANA / NEAR currently only EVM is supported
  },
  decimals: number,
  name: string,
  symbol: string,
  logo_uri: string,
  token_type: TokenType
}

export const getTokens = async (): Promise<Token[]> =>  {
  const { data } = await axios.get(`${ARISE_BACKEND_BASE_URL}/v1/tokens`, {
    params: {
      page: 1,
      limit: 10
    }
  });

  return data.data.records;
}