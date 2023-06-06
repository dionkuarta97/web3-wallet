import '@ethersproject/shims';
const Moralis = require('moralis').default;
import { ethers } from 'ethers';
const bip39 = require('bip39');
import HDKey from 'hdkey';
import { networks } from './wallet/network';
import coinGecko from './apiUrl/coinGecko';
import { NetworkType, TokenType } from '../state/wallet/walletTypes';

export type NewWallet = {
  mnemonic: string;
  privateKey: string;
  address: string;
};

export const createWallet = (phrase = '', private_key = '') => {
  return new Promise<NewWallet>(async (resolved, rejected) => {
    try {
      if (private_key === '') {
        const entropy = ethers.utils.randomBytes(16);
        let mnemonic = phrase;
        if (mnemonic === '') {
          mnemonic = ethers.utils.entropyToMnemonic(entropy);
        }
        const hdkey = HDKey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));
        const derivedNode = hdkey.derive(ethers.utils.defaultPath);

        const privateKey = ethers.utils.hexlify(derivedNode.privateKey);

        let wallet = [];

        for (const key in networks) {
          let temp = null;
          const ethersProvider = ethers.getDefaultProvider(networks[key].rpcUrl);
          temp = new ethers.Wallet(privateKey, ethersProvider);
          wallet.push(temp);
          temp = null;
        }

        let result: NewWallet = {
          mnemonic,
          privateKey,
          address: wallet[0].address
        };
        resolved(result);
      } else {
        let wallet = [];

        for (const key in networks) {
          let temp = null;
          const ethersProvider = ethers.getDefaultProvider(networks[key].rpcUrl);
          temp = new ethers.Wallet(private_key, ethersProvider);
          wallet.push(temp);
          temp = null;
        }

        let result: NewWallet = {
          mnemonic: 'arise',
          privateKey: private_key,
          address: wallet[0].address
        };
        resolved(result);
      }
    } catch (error) {
      console.log(error);
      rejected(error);
    }
  });
};

const getNativeBalance = async (address: string, chainId: string) => {
  try {
    const response = await Moralis.EvmApi.balance.getNativeBalance({
      chain: chainId,
      address: address
    });
    return response.raw;
  } catch (err) {
    throw err;
  }
};

const getToken = async (address: string, chainId: string) => {
  try {
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: chainId,
      address: address
    });
    return response.raw;
  } catch (err) {
    throw err;
  }
};

const getPrice = async (coinGeckoId: string, tokenAddress: string) => {
  try {
    const { data } = await coinGecko({
      method: 'get',
      url: `/coins/${coinGeckoId}/contract/${tokenAddress}`
    });

    return data;
  } catch (error) {
    return {
      error: true
    };
  }
};

export const detectBalance = (
  address: string,
  isNew: boolean = false
): Promise<{ idrAsset: number; tempNetworks: NetworkType[] }> => {
  return new Promise(async (reolved, rejected) => {
    try {
      if (isNew) {
        const response = await newWallet();
        reolved(response);
      } else {
        let tempNetworks: NetworkType[] = [];
        let idrAsset = 0;
        for (const key in networks) {
          let nativeBalance = await getNativeBalance(address, networks[key].chainId);

          let temp: any = {
            networkName: networks[key].name,
            name: networks[key].nativeCurrency.name,
            slug: networks[key].slug,
            balance: bigNumberFormatUnits(
              nativeBalance.balance,
              networks[key].nativeCurrency.decimals
            ),
            symbol: networks[key].nativeCurrency.symbol
          };

          if (temp.balance > 0 && networks[key].coinGeckoId !== 'testnet') {
            let nativePrice = await getPrice(
              networks[key].coinGeckoId,
              networks[key].nativeCurrency.wrappedTokenAddress
            );
            temp['idrPrice'] = nativePrice.error ? 0 : nativePrice.market_data.current_price.idr;
          } else {
            temp['idrPrice'] = 0;
          }

          idrAsset += Number(temp['balance']) * temp['idrPrice'];

          let tokens: TokenType[] = [];
          let token = await getToken(address, networks[key].chainId);
          for (const i in token) {
            let tem: any = {
              token_address: token[i].token_address,
              name: token[i].name,
              possible_spam: token[i].possible_spam,
              symbol: token[i].symbol,
              balance: bigNumberFormatUnits(token[i].balance, token[i].decimals)
            };
            if (networks[key].coinGeckoId !== 'testnet') {
              let tokenPrice = await getPrice(networks[key].coinGeckoId, token[i].token_address);
              tem['idrPrice'] = tokenPrice.error ? 0 : tokenPrice.market_data.current_price.idr;
              tem['logo'] = tokenPrice.error ? null : tokenPrice.image.large;
            } else {
              tem['idrPrice'] = 0;
              tem['logo'] = null;
            }

            idrAsset += Number(tem['balance']) * tem['idrPrice'];
            tokens.push(tem);
          }
          temp['tokens'] = tokens;

          tempNetworks.push(temp);
        }
        let response: { idrAsset: number; tempNetworks: NetworkType[] } = {
          tempNetworks,
          idrAsset
        };
        reolved(response);
      }
    } catch (err) {
      rejected(err);
    }
  });
};

const newWallet = async () => {
  let tempNetworks: NetworkType[] = [];
  let idrAsset = 0;
  for (const key in networks) {
    tempNetworks.push({
      networkName: networks[key].name,
      name: networks[key].nativeCurrency.name,
      slug: networks[key].slug,
      balance: '0',
      symbol: networks[key].nativeCurrency.symbol,
      idrPrice: 0,
      tokens: []
    });
  }
  let response: { idrAsset: number; tempNetworks: NetworkType[] } = { tempNetworks, idrAsset };
  return response;
};

const bigNumberFormatUnits = (value: string, decims = 18) => {
  return ethers.utils.formatUnits(value, decims);
};
