type TokenType = {
  uuid: string;
  created_at: String;
  updated_at: string;
  deleted_at: null;
  address: string;
  network: {
    uuid: string;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    chain_id: number;
    name: string;
    slug: string;
    network_type: string;
  };
  decimals: number;
  name: string;
  symbol: string;
  logo_uri: string;
  token_type: string;
};

export type initialToken = {
  listTokens: TokenType[] | null;
};
