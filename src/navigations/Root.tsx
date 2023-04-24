import {
  createStackNavigator,
  TransitionPresets,
  StackNavigationEventMap,
  StackNavigationOptions
} from '@react-navigation/stack';
import type {
  NavigatorScreenParams,
  RouteConfig,
  StackNavigationState
} from '@react-navigation/core';
import OpeningRouter, { OpeningParamList } from './OpeningRouter';
import AuthRouter, { AuthParamList } from './AuthRouter';

export type RootParamList = {
  OpeningRouter: NavigatorScreenParams<OpeningParamList>;
  AuthRouter: NavigatorScreenParams<AuthParamList>;
};

const RootStack = createStackNavigator<RootParamList>();

type router = RouteConfig<
  RootParamList,
  keyof RootParamList,
  StackNavigationState<RootParamList>,
  StackNavigationOptions,
  StackNavigationEventMap
>;

const routes: router[] = [
  { name: 'OpeningRouter', component: OpeningRouter },
  {
    name: 'AuthRouter',
    component: AuthRouter
  }
];

const Root = () => {
  return (
    <RootStack.Navigator
      initialRouteName="OpeningRouter"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      {routes.map((route) => (
        <RootStack.Screen key={route.name} {...route} />
      ))}
    </RootStack.Navigator>
  );
};

export default Root;
