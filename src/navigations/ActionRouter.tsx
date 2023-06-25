import {
  createStackNavigator,
  StackNavigationEventMap,
  StackNavigationOptions
} from '@react-navigation/stack';
import { RouteProp, type RouteConfig, type StackNavigationState } from '@react-navigation/core';
import DefaultHeader from '../components/DefaultHeader';
import WalletAmountScreen from '../screens/wallet/send/WalletAmountScreen';
import CustomHeader from '../components/CustomHeader';
import SendActionScreen from '../screens/action/SendActionScreen';

export type ActionParamList = {
  SendActionScreen: undefined;
  WalletAmountScreen:
    | {
        data: {
          from: string;
          to: string;
          network: string;
          valid: boolean;
          amount?: number;
        };
      }
    | undefined;
};

const ActionStack = createStackNavigator<ActionParamList>();

type action = RouteConfig<
  ActionParamList,
  keyof ActionParamList,
  StackNavigationState<ActionParamList>,
  StackNavigationOptions,
  StackNavigationEventMap
>;

export type ActionRouteProps<RouteName extends keyof ActionParamList> = RouteProp<
  ActionParamList,
  RouteName
>;

const actions: action[] = [
  {
    name: 'WalletAmountScreen',
    component: WalletAmountScreen,
    options: {
      header: () => <DefaultHeader />
    }
  },
  {
    name: 'SendActionScreen',
    component: SendActionScreen,
    options: {
      header: () => <CustomHeader />
    }
  }
];

const ActionRouter = () => {
  return (
    <ActionStack.Navigator
      screenOptions={{
        animationEnabled: false
      }}
    >
      {actions.map((el) => (
        <ActionStack.Screen {...el} key={el.name} />
      ))}
    </ActionStack.Navigator>
  );
};

export default ActionRouter;
