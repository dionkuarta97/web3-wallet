import {
  createStackNavigator,
  TransitionPresets,
  StackNavigationEventMap,
  StackNavigationOptions
} from '@react-navigation/stack';
import type { RouteConfig, StackNavigationState } from '@react-navigation/core';
import OpeningScreen from '../screens/auth/OpeningScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import DefaultHeader from '../components/DefaultHeader';

export type AuthParamList = {
  OpeningScreen: undefined;
  SignInScreen: undefined;
};

const AuthStack = createStackNavigator<AuthParamList>();

type auth = RouteConfig<
  AuthParamList,
  keyof AuthParamList,
  StackNavigationState<AuthParamList>,
  StackNavigationOptions,
  StackNavigationEventMap
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
