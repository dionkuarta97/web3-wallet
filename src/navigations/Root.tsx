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
import { OpeningParamList } from './OpeningRouter';

export type RootParamList = {
  OpeningScreen: NavigatorScreenParams<OpeningParamList>;
};

type router = RouteConfig<
  RootParamList,
  keyof RootParamList,
  StackNavigationState<RootParamList>,
  StackNavigationOptions,
  StackNavigationEventMap
>;

const routes: router[] = [{ name: 'OpeningScreen' }];
