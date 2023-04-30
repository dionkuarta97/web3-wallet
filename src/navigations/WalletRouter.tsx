import { Center, Text } from 'native-base';
import {
  createStackNavigator,
  StackNavigationEventMap,
  StackNavigationOptions
} from '@react-navigation/stack';
import { type RouteConfig, type StackNavigationState } from '@react-navigation/core';
import CustomHeader from '../components/CustomHeader';

const AllWalletScreen = () => {
  return (
    <Center justifyContent={'center'} alignItems={'center'}>
      <Text>AllWallet</Text>
    </Center>
  );
};

const ConnectWalletScreen = () => {
  return (
    <Center justifyContent={'center'} alignItems={'center'}>
      <Text>ConnectWallet</Text>
    </Center>
  );
};

export type WalletParamList = {
  AllWalletScreen: undefined;
  ConnectScreen: undefined;
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
    name: 'ConnectScreen',
    component: ConnectWalletScreen,
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
