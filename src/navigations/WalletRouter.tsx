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
import DefaultHeader from '../components/DefaultHeader';
import PrivateKeyPhraseShowScreen from '../screens/wallet/PrivateKeyPhraseShowScreen';
import PrivateKeyPhraseInputScreen from '../screens/wallet/PrivateKeyPhraseInputScreen';

export type WalletParamList = {
  AllWalletScreen: undefined;
  CreateWalletScreen: undefined;
  ImportWalletScreen: undefined;
  PrivateKeyPhraseShowContent: undefined;
  PrivateKeyPhraseInputScreen: undefined;
};

const WalletStack = createStackNavigator<WalletParamList>();

type wallet = RouteConfig<
  WalletParamList,
  keyof WalletParamList,
  StackNavigationState<WalletParamList>,
  StackNavigationOptions,
  StackNavigationEventMap
>;

const ImportWalletScreen = () => {
  return (
    <Center justifyContent={'center'} alignItems={'center'}>
      <Text>ImportWallet</Text>
    </Center>
  );
};

const wallets: wallet[] = [
  {
    name: 'AllWalletScreen',
    component: AllWalletScreen,
    options: {
      header: () => <CustomHeader />
    }
  },

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
