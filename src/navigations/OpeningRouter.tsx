import {
  createStackNavigator,
  TransitionPresets,
  StackNavigationEventMap,
  StackNavigationOptions
} from '@react-navigation/stack';
import type { RouteConfig, StackNavigationState } from '@react-navigation/core';
import SplashScreen from '../screens/opening/SplashScreen';
import OnBoardingScreen from '../screens/opening/OnBoardingScreen';

export type OpeningParamList = {
  SplashScreen: undefined;
  OnBoardingScreen: undefined;
};

const OpeningStack = createStackNavigator<OpeningParamList>();

type opening = RouteConfig<
  OpeningParamList,
  keyof OpeningParamList,
  StackNavigationState<OpeningParamList>,
  StackNavigationOptions,
  StackNavigationEventMap
>;

const openings: opening[] = [
  { name: 'SplashScreen', component: SplashScreen },
  {
    name: 'OnBoardingScreen',
    component: OnBoardingScreen
  }
];

const OpeningRouter = () => {
  return (
    <OpeningStack.Navigator>
      {openings.map((opening) => (
        <OpeningStack.Screen key={opening.name} {...opening} />
      ))}
    </OpeningStack.Navigator>
  );
};

export default OpeningRouter;
