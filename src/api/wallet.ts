import '@ethersproject/shims';
import { ethers } from 'ethers';
const bip39 = require('bip39');
import HDKey from 'hdkey';
import { ERC20ABI } from './abi';

export type NewWallet = {
  mnemonic: string;
  privateKey: string;
  address: string;
};

const providerUrl =
  'https://rpc.ankr.com/bsc_testnet_chapel/fb4f7a26ae85817a02296a531e0eae5a92e45a3b61601c6670f80506c816762a';
export const createWallet = () => {
  return new Promise<NewWallet>(async (resolved, rejected) => {
    try {
      const ethersProvider = ethers.getDefaultProvider(providerUrl);

      const entropy = ethers.utils.randomBytes(16);
      const mnemonic = ethers.utils.entropyToMnemonic(entropy);

      const hdkey = HDKey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));

      const derivedNode = hdkey.derive(ethers.utils.defaultPath);

      const privateKey = ethers.utils.hexlify(derivedNode.privateKey);

      let wallet = new ethers.Wallet(privateKey, ethersProvider);

      let result: NewWallet = {
        mnemonic,
        privateKey,
        address: wallet.address
      };
      resolved(result);
    } catch (error) {
      rejected(error);
    }
  });
};

function bigNumberFormatUnits(value: ethers.BigNumberish, decims = 18) {
  return ethers.utils.formatUnits(value, decims);
}

export const getBalance = (address: string) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    } catch (err) {
      rejected(err);
    }
  });
};
