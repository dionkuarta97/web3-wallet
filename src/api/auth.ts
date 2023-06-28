import * as WebBrowser from '@toruslabs/react-native-web-browser';
import Web3Auth, {
  LOGIN_PROVIDER,
  MFA_LEVELS,
  OPENLOGIN_NETWORK,
  SdkInitParams
} from '@web3auth/react-native-sdk';
import { WEB3_AUTH_CLIENT_ID, ARISE_BACKEND_BASE_URL } from '@env';
import axios from 'axios';

const redirectUrl = `ariseweb3auth://auth`;

const clientId = WEB3_AUTH_CLIENT_ID;

const web3AuthParams: SdkInitParams = {
  clientId,
  network: OPENLOGIN_NETWORK.AQUA,
  loginConfig: {
    // Add login configs corresponding to the provider
    // For firebase/ cognito & other providers, you need to pass the JWT token
    // JWT login
    jwt: {
      verifier: 'arise-auth-verifier-testnet', // Please create a verifier on the developer dashboard and pass the name here
      typeOfLogin: 'jwt',
      clientId
    }
    // Add other login providers here
  }
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
  console.log({ email, password })
  const backendResponse = await axios.post(`${ARISE_BACKEND_BASE_URL}/v1/auth/login`, {
    email,
    password
  });
  console.log({ backendResponse });
  const { token } = backendResponse.data;
  const web3AuthResponse = await loginJwt(token);

  console.log({ web3AuthResponse });
  return web3AuthResponse;
};

export const registerEmailPassword = (email: string, password: string) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const { data } = await axios.post(`${ARISE_BACKEND_BASE_URL}/v1/auth/register`, {
        email,
        password
      });
      resolved('success');
    } catch (error: any) {
      if (error.response.data?.message) {
        rejected(error.response.data.message);
      } else {
        rejected('internal server error');
      }
    }
  });
};

export const resendEmailVerification = async (email: string) => {
  try {
    const { data } = await axios({
      url: ARISE_BACKEND_BASE_URL + '/auth/resend-email-verification',
      method: 'GET',
      params: {
        email
      }
    });
    return data;
  } catch (error) {
    throw 'internal server error';
  }
};

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
          verifierIdField: 'sub'
        }
      });
      resolve(response);
    } catch (err) {
      console.log({ err });
      reject(err);
    }
  });
};

export const registerJwt = async (jwtToken: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.JWT,
        redirectUrl,
        mfaLevel: MFA_LEVELS.OPTIONAL,
        curve: 'secp256k1',
        extraLoginOptions: {
          id_token: jwtToken,
          verifierIdField: 'sub'
        }
      });
      resolve(response);
    } catch (err) {
      console.log({ err });
      reject(err);
    }
  });
};
