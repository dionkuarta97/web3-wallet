import * as WebBrowser from '@toruslabs/react-native-web-browser';
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
  SdkInitParams
} from '@web3auth/react-native-sdk';

const redirectUrl = `ariseweb3auth://auth`;

const clientId =
  'BATdZ3CpPj-rqgudz8mkoJ8EOC0oT4itYO3lev6ZsG-ofU8Sg4FGvX8kWyLLV3WTwjg70ZaNrkki6rT6K19XyW8';

const web3AuthParams: SdkInitParams = {
  clientId,
  network: OPENLOGIN_NETWORK.TESTNET
};

const web3auth = new Web3Auth(WebBrowser, web3AuthParams);

const login = async (loginProvider: string) => {
  const response = await web3auth.login({
    loginProvider,
    redirectUrl,
    mfaLevel: 'default',
    curve: 'secp256k1'
  });

  console.log(redirectUrl);

  return response;
};

export const loginGoogle = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await login(LOGIN_PROVIDER.GOOGLE);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const loginFacebook = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await login(LOGIN_PROVIDER.FACEBOOK);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
