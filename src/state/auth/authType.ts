type UserInfo = {
  email: string;
  name: string;
  profileImage: string;
  aggregateVerifier: string;
  verifier: string;
  verifierId: string;
  typeOfLogin: string;
  dappShare: string;
  idToken: string;
  oAuthIdToken: string;
  oAuthAccessToken: string;
};
type UserType = {
  appState: string;
  privKey: string;
  sessionId: string;
  coreKitKey: string;
  coreKitEd25519PrivKey: string;
  ed25519PrivKey: string;
  userInfo: UserInfo;
  pin: number | null;
};

export type InitialStateTypes = {
  isLogin: boolean;
  firstOpen: boolean;
  userInfo: UserType | null;
  inputPin: any[] | null;
  inputRepin: any[] | null;
};
