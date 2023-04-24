import * as WebBrowser from '@toruslabs/react-native-web-browser';
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
  SdkInitParams,
} from '@web3auth/react-native-sdk';

const scheme = 'ariseweb3auth'; // Or your desired app redirection scheme
const redirectUrl = `ariseweb3auth://auth`;

const clientId =
  'BATdZ3CpPj-rqgudz8mkoJ8EOC0oT4itYO3lev6ZsG-ofU8Sg4FGvX8kWyLLV3WTwjg70ZaNrkki6rT6K19XyW8';

const web3AuthParams: SdkInitParams = {
  clientId,
  network: OPENLOGIN_NETWORK.TESTNET,
};

const web3auth = new Web3Auth(WebBrowser, web3AuthParams);

const login = async (loginProvider: string) => {
  const response = await web3auth.login({
    loginProvider,
    redirectUrl,
    mfaLevel: 'default',
    curve: 'secp256k1',
  });

  console.log(redirectUrl);

  return response;
};

export const loginGoogle = async () => {
  try {
    const response = await login(LOGIN_PROVIDER.GOOGLE);
    console.log(JSON.stringify(response, null, 2));
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const loginApple = async () => {
  const response = await login(LOGIN_PROVIDER.APPLE);
  return response;
};

export const loginFacebook = async () => {
  const response = await login(LOGIN_PROVIDER.FACEBOOK);
  return response;
};
