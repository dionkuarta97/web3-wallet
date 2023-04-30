import { Center, Text } from 'native-base';

import type {
  NavigatorScreenParams,
  RouteConfig,
  StackNavigationState
} from '@react-navigation/core';

import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import HomeRouter, { HomeParamList } from './HomeRouter';
import WalletRouter, { WalletParamList } from './WalletRouter';
import DefaultBottomTab from '../components/bottomTab/DefaultBottomTab';
import { height } from '../Helpers';
import WalletBottomTab from '../components/bottomTab/WalletBottomTab';

export type BottomTabParamList = {
  HomeRouter: NavigatorScreenParams<HomeParamList>;
  WalletRouter: NavigatorScreenParams<WalletParamList>;
  ActionScreen: undefined;
  ChatScreen: undefined;
  MeScreen: undefined;
};

const Bottom = createBottomTabNavigator<BottomTabParamList>();

type menu = RouteConfig<
  BottomTabParamList,
  keyof BottomTabParamList,
  StackNavigationState<BottomTabParamList>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap
>;

const ActionScreen = () => {
  return (
    <Center justifyContent={'center'} alignItems={'center'}>
      <Text>Action</Text>
    </Center>
  );
};

const ChatScreen = () => {
  return (
    <Center justifyContent={'center'} alignItems={'center'}>
      <Text>Chat</Text>
    </Center>
  );
};

const MeScreen = () => {
  return (
    <Center justifyContent={'center'} alignItems={'center'}>
      <Text>Me</Text>
    </Center>
  );
};

const menus: menu[] = [
  {
    name: 'HomeRouter',
    component: HomeRouter,
    options: {
      headerShown: false,
      tabBarButton: (props) => (
        <DefaultBottomTab
          {...props}
          router="HomeRouter"
          screen="HomeScreen"
          image={require('../../assets/icon/home.png')}
          label="Home"
        />
      )
    }
  },
  {
    name: 'WalletRouter',
    component: WalletRouter,
    options: {
      headerShown: false,
      tabBarButton: (props) => (
        <WalletBottomTab
          {...props}
          label="Wallet"
          image={require('../../assets/icon/wallet.png')}
          menus={[
            {
              label: 'All',
              image: require('../../assets/icon/all.png'),
              screen: 'AllWalletScreen'
            },
            {
              label: 'Connect',
              image: require('../../assets/icon/connect.png'),
              screen: 'ConnectScreen'
            }
          ]}
        />
      )
    }
  },
  {
    name: 'ActionScreen',
    component: ActionScreen,
    options: {
      headerShown: false,
      tabBarButton: (props) => (
        <DefaultBottomTab
          {...props}
          router="ActionScreen"
          image={require('../../assets/icon/action.png')}
          label="Action"
        />
      )
    }
  },
  {
    name: 'ChatScreen',
    component: ChatScreen,
    options: {
      headerShown: false,
      tabBarButton: (props) => (
        <DefaultBottomTab
          {...props}
          router="ChatScreen"
          image={require('../../assets/icon/chat.png')}
          label="Chat"
        />
      )
    }
  },
  {
    name: 'MeScreen',
    component: MeScreen,
    options: {
      headerShown: false,
      tabBarButton: (props) => (
        <DefaultBottomTab
          {...props}
          router="MeScreen"
          image={require('../../assets/icon/me.png')}
          label="Me"
        />
      )
    }
  }
];

const BottomTabRouter = () => {
  return (
    <Bottom.Navigator
      screenOptions={{
        tabBarStyle: {
          height: height / 10,
          zIndex: 10,
          position: 'absolute',
          elevation: 0,
          borderTopWidth: 0
        }
      }}
    >
      {menus.map((el) => (
        <Bottom.Screen {...el} key={el.name} />
      ))}
    </Bottom.Navigator>
  );
};

export default BottomTabRouter;
