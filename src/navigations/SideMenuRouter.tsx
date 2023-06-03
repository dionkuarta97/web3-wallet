import { createStackNavigator } from '@react-navigation/stack';
import AllWalletScreen from '../screens/wallet/AllWalletScreen';
import CustomHeader from '../components/CustomHeader';

export type SideMenuParamList = {
  SideAllWallet: undefined;
};

const SideMenu = createStackNavigator<SideMenuParamList>();
const SideMenuRouter = () => {
  return (
    <SideMenu.Navigator>
      <SideMenu.Screen
        options={{
          header: () => <CustomHeader />
        }}
        name="SideAllWallet"
        component={AllWalletScreen}
      />
    </SideMenu.Navigator>
  );
};

export default SideMenuRouter;
