import * as WebBrowser from '@toruslabs/react-native-web-browser';
import Web3Auth, {
  LOGIN_PROVIDER,
  MFA_LEVELS,
  OPENLOGIN_NETWORK,
  SdkInitParams,
} from '@web3auth/react-native-sdk';
import {WEB3_AUTH_CLIENT_ID, ARISE_BACKEND_BASE_URL} from '@env';
import axios from 'axios';

const redirectUrl = `ariseweb3auth://auth`;

// const clientId =
//   'BATdZ3CpPj-rqgudz8mkoJ8EOC0oT4itYO3lev6ZsG-ofU8Sg4FGvX8kWyLLV3WTwjg70ZaNrkki6rT6K19XyW8';
const clientId = WEB3_AUTH_CLIENT_ID;

const web3AuthParams: SdkInitParams = {
  clientId,
  network: OPENLOGIN_NETWORK.TESTNET,
  loginConfig: {
    // Add login configs corresponding to the provider
    // For firebase/ cognito & other providers, you need to pass the JWT token
    // JWT login
    jwt: {
      verifier: "arise-auth-verifier-testnet", // Please create a verifier on the developer dashboard and pass the name here
      typeOfLogin: "jwt",
      clientId
    },
    // Add other login providers here
  },
};

const web3auth = new Web3Auth(WebBrowser, web3AuthParams);

const login = async (loginProvider: string) => {
  return new Promise(async (resolve, reject) => {
    try {
    const response = await web3auth.login({
      loginProvider,
      redirectUrl,
      mfaLevel: MFA_LEVELS.OPTIONAL,
      curve: 'secp256k1'
    });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
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

export const loginEmailPassword = async (email: string, password: string) => {
  const backendResponse = await axios.post(`${ARISE_BACKEND_BASE_URL}/auth/login`, {
    email,
    password
  });

  const { token } = backendResponse.data;
  const web3AuthResponse = await loginJwt(token);

  console.log({ web3AuthResponse });
  return web3AuthResponse;
}

export const loginJwt = async (jwtToken: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.JWT,
        redirectUrl,
        mfaLevel: MFA_LEVELS.OPTIONAL,
        curve: 'secp256k1',
        extraLoginOptions: {
          id_token: jwtToken,
          verifierIdField: 'sub',
        },
      })
      resolve(response);
    } catch (err) {
      console.log({err});
      reject(err);
    }
  });
} 
