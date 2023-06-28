import {
  createStackNavigator,
  TransitionPresets,
  StackNavigationEventMap,
  StackNavigationOptions
} from '@react-navigation/stack';
import type { RouteConfig, RouteProp, StackNavigationState } from '@react-navigation/core';
import OpeningScreen from '../screens/auth/OpeningScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import DefaultHeader from '../components/DefaultHeader';
import SetupPinScreen from '../screens/auth/SetupPinScreen';
import ReenterPinScreen from '../screens/auth/ReenterPinScreen';
import InputPinScreen from '../screens/auth/InputPinScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import EmailVerificationScreen from '../screens/auth/EmailVerificationScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import SendVerification from '../screens/auth/forgotPassword/SendVerification';
import OtpScren from '../screens/auth/forgotPassword/OtpScreen';
import ResetPasswordScreen from '../screens/auth/forgotPassword/ResetPasswordScreen';
import SuccessReset from '../screens/auth/forgotPassword/SuccessReset';

export type AuthParamList = {
  OpeningScreen: undefined;
  SignInScreen: undefined;
  SetupPinScreen: undefined;
  ReenterPinScreen: undefined;
  InputPinScreen:
    | {
        data: {
          from: string;
          to: string;
          network: string;
          valid: boolean;
          amount?: number | string;
        };
      }
    | undefined;
  SignUpScreen: undefined;
  EmailVerificationScreen: { email: string };
  ForgotPasswordScreen: undefined;
  SendVerification: undefined;
  OtpScreen: undefined;
  ResetPasswordScreen: undefined;
  SuccessReset: undefined;
};

const AuthStack = createStackNavigator<AuthParamList>();

type auth = RouteConfig<
  AuthParamList,
  keyof AuthParamList,
  StackNavigationState<AuthParamList>,
  StackNavigationOptions,
  StackNavigationEventMap
>;

export type AuthRouteProps<RouteName extends keyof AuthParamList> = RouteProp<
  AuthParamList,
  RouteName
>;

const auths: auth[] = [
  {
    name: 'OpeningScreen',
    component: OpeningScreen,
    options: {
      headerShown: false
    }
  },
  {
    name: 'SignInScreen',
    component: SignInScreen,
    options: {
      header: () => <DefaultHeader />
    }
  },
  {
    name: 'SetupPinScreen',
    component: SetupPinScreen,
    options: {
      header: () => <DefaultHeader />
    }
  },
  {
    name: 'ReenterPinScreen',
    component: ReenterPinScreen,
    options: {
      header: () => <DefaultHeader />
    }
  },
  {
    name: 'InputPinScreen',
    component: InputPinScreen,
    options: {
      header: () => <DefaultHeader />
    }
  },
  {
    name: 'SignUpScreen',
    component: SignUpScreen,
    options: {
      header: () => <DefaultHeader />
    }
  },
  {
    name: 'EmailVerificationScreen',
    component: EmailVerificationScreen,
    options: {
      header: () => <DefaultHeader type="dark" />
    }
  },
  {
    name: 'ForgotPasswordScreen',
    component: ForgotPasswordScreen,
    options: {
      header: () => <DefaultHeader />
    }
  },
  {
    name: 'SendVerification',
    component: SendVerification,
    options: {
      headerShown: false
    }
  },
  {
    name: 'OtpScreen',
    component: OtpScren,
    options: {
      headerShown: false
    }
  },
  {
    name: 'ResetPasswordScreen',
    component: ResetPasswordScreen,
    options: {
      headerShown: false
    }
  },
  {
    name: 'SuccessReset',
    component: SuccessReset,
    options: {
      headerShown: false
    }
  }
];

const AuthRouter = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      {auths.map((auth) => (
        <AuthStack.Screen key={auth.name} {...auth} />
      ))}
    </AuthStack.Navigator>
  );
};

export default AuthRouter;
