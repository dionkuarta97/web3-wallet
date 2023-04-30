import {
  createStackNavigator,
  StackNavigationEventMap,
  StackNavigationOptions
} from '@react-navigation/stack';
import type { RouteConfig, StackNavigationState } from '@react-navigation/core';
import HomeScreen from '../screens/home/HomeScreen';
import CustomHeader from '../components/CustomHeader';

export type HomeParamList = {
  HomeScreen: undefined;
};

const HomeStack = createStackNavigator<HomeParamList>();

type home = RouteConfig<
  HomeParamList,
  keyof HomeParamList,
  StackNavigationState<HomeParamList>,
  StackNavigationOptions,
  StackNavigationEventMap
>;

const homes: home[] = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    options: {
      header: () => <CustomHeader />
    }
  }
];

const HomeRouter = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      {homes.map((el) => (
        <HomeStack.Screen {...el} key={el.name} />
      ))}
    </HomeStack.Navigator>
  );
};

export default HomeRouter;
