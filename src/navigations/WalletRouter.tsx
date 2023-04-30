import { Center, Text } from 'native-base';
import {
  createStackNavigator,
  StackNavigationEventMap,
  StackNavigationOptions
} from '@react-navigation/stack';
import { type RouteConfig, type StackNavigationState } from '@react-navigation/core';
import CustomHeader from '../components/CustomHeader';
import AllWalletScreen from '../screens/wallet/AllWalletScreen';
import CreateWalletScreen from '../screens/wallet/CreateWalletScreen';

export type WalletParamList = {
  AllWalletScreen: undefined;
  CreateWalletScreen: undefined;
};

const WalletStack = createStackNavigator<WalletParamList>();

type wallet = RouteConfig<
  WalletParamList,
  keyof WalletParamList,
  StackNavigationState<WalletParamList>,
  StackNavigationOptions,
  StackNavigationEventMap
>;

const wallets: wallet[] = [
  {
    name: 'AllWalletScreen',
    component: AllWalletScreen,
    options: {
      header: () => <CustomHeader />
    }
  },
  {
    name: 'CreateWalletScreen',
    component: CreateWalletScreen,
    options: {
      header: () => <CustomHeader />
    }
  }
];

const WalletRouter = () => {
  return (
    <WalletStack.Navigator
      screenOptions={{
        animationEnabled: false
      }}
    >
      {wallets.map((el) => (
        <WalletStack.Screen {...el} key={el.name} />
      ))}
    </WalletStack.Navigator>
  );
};

export default WalletRouter;
