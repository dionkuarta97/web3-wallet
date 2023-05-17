import { Center, Text } from 'native-base';
import {
  createStackNavigator,
  StackNavigationEventMap,
  StackNavigationOptions
} from '@react-navigation/stack';
import { RouteProp, type RouteConfig, type StackNavigationState } from '@react-navigation/core';
import CustomHeader from '../components/CustomHeader';
import AllWalletScreen from '../screens/wallet/AllWalletScreen';
import CreateWalletScreen from '../screens/wallet/CreateWalletScreen';
import DefaultHeader from '../components/DefaultHeader';
import PrivateKeyPhraseShowScreen from '../screens/wallet/PrivateKeyPhraseShowScreen';
import PrivateKeyPhraseInputScreen from '../screens/wallet/PrivateKeyPhraseInputScreen';
import DetailWalletScreen from '../screens/wallet/DetailWalletScreen';
import ImportWalletScreen from '../screens/wallet/ImportWalletScreen';

export type WalletParamList = {
  AllWalletScreen: { new: boolean } | undefined;
  CreateWalletScreen: undefined;
  ImportWalletScreen: undefined;
  PrivateKeyPhraseShowContent: undefined;
  PrivateKeyPhraseInputScreen: undefined;
  DetailWalletScreen: { indexWallet: number };
};

const WalletStack = createStackNavigator<WalletParamList>();

type wallet = RouteConfig<
  WalletParamList,
  keyof WalletParamList,
  StackNavigationState<WalletParamList>,
  StackNavigationOptions,
  StackNavigationEventMap
>;

export type WalletRouteProps<RouteName extends keyof WalletParamList> = RouteProp<
  WalletParamList,
  RouteName
>;

const wallets: wallet[] = [
  {
    name: 'ImportWalletScreen',
    component: ImportWalletScreen,
    options: {
      header: () => <DefaultHeader />
    }
  },
  {
    name: 'PrivateKeyPhraseShowContent',
    component: PrivateKeyPhraseShowScreen,
    options: {
      header: () => <DefaultHeader />
    }
  },
  {
    name: 'AllWalletScreen',
    component: AllWalletScreen,
    options: {
      header: () => <CustomHeader />
    }
  },
  {
    name: 'PrivateKeyPhraseInputScreen',
    component: PrivateKeyPhraseInputScreen,
    options: {
      header: () => <DefaultHeader />
    }
  },
  {
    name: 'CreateWalletScreen',
    component: CreateWalletScreen,
    options: {
      header: () => <DefaultHeader />
    }
  },
  {
    name: 'DetailWalletScreen',
    component: DetailWalletScreen,
    options: {
      header: () => <DefaultHeader />
    }
  }
];

const WalletRouter = () => {
  return (
    <WalletStack.Navigator
      initialRouteName="AllWalletScreen"
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
