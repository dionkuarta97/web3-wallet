import Modal from 'react-native-modal';
import { StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../Colors';
import { height, width } from '../../Helpers';
import { Button, Text, View, Pressable, ScrollView } from 'native-base';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { RootParamList } from '../../navigations/Root';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '../../navigations/BottomTabRouter';
import { helps, securitys, transactions, wallets } from '../../data/SideMenuData';
import { useAtom } from 'jotai';
import { authReducer } from '../../state/auth/authReducer';
import { walletReducer } from '../../state/wallet/walletReducer';
import { Wallet } from '../../state/wallet/walletTypes';

type Props = {
  // header: ReactNode;
  // body: ReactNode;
  // footer: ReactNode;
  show: boolean;
  tapHandler?: () => void;
};

const SideMenuModal = ({ tapHandler, show }: Props) => {
  const [, dispatch] = useAtom(authReducer);
  const [wallet, setWallet] = useAtom(walletReducer);
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  return (
    <Modal
      style={{
        margin: 0
      }}
      customBackdrop={
        <TouchableWithoutFeedback
          onPress={() => {
            tapHandler();
          }}
        >
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      }
      animationIn={'slideInLeft'}
      animationOut={'slideOutLeft'}
      isVisible={show}
    >
      <View p={5} style={styles.body}>
        <Pressable
          onPress={() => {
            tapHandler();
          }}
          alignSelf="flex-start"
        >
          {({ isPressed }) => {
            return (
              <View
                style={{
                  opacity: isPressed ? 0.7 : 1,
                  transform: [
                    {
                      scale: isPressed ? 0.96 : 1
                    }
                  ]
                }}
              >
                <Image
                  style={styles.image}
                  source={require('../../../assets/icon/arrowBack.png')}
                />
              </View>
            );
          }}
        </Pressable>
        <ScrollView marginTop={8}>
          <Text ml={3} mb={1} fontWeight={'bold'}>
            Wallet
          </Text>
          {wallets.map((el, idx) => (
            <TouchableOpacity
              key={idx + 'wallets'}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5
              }}
            >
              <Image
                source={el.icon}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 15,
                  resizeMode: 'contain'
                }}
              />
              <Text>{el.title}</Text>
              {el.title === 'Currency' && (
                <View py={0.5} px={2} shadow={2} borderRadius={6} bg={'#F5F5F5'} ml={'auto'}>
                  <Text>IDR</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          <Text ml={3} mt={8} mb={1} fontWeight={'bold'}>
            Security
          </Text>
          {securitys.map((el, idx) => (
            <TouchableOpacity
              key={idx + 'secure'}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5
              }}
            >
              <Image
                source={el.icon}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 15,
                  resizeMode: 'contain'
                }}
              />
              <Text>{el.title}</Text>
            </TouchableOpacity>
          ))}
          <Text ml={3} mt={8} mb={1} fontWeight={'bold'}>
            Transaction
          </Text>
          {transactions.map((el, idx) => (
            <TouchableOpacity
              key={idx + 'trans'}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5
              }}
            >
              <Image
                source={el.icon}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 15,
                  resizeMode: 'contain'
                }}
              />
              <Text>{el.title}</Text>
            </TouchableOpacity>
          ))}
          {helps.map((el, idx) => (
            <TouchableOpacity
              key={idx + 'help'}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
                marginTop: idx === 0 ? 25 : 5
              }}
            >
              <Image
                source={el.icon}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 15,
                  resizeMode: 'contain'
                }}
              />
              <Text>{el.title}</Text>
              {el.title === 'Language' && (
                <View py={0.5} px={2} shadow={2} borderRadius={6} bg={'#F5F5F5'} ml={'auto'}>
                  <Text>ID</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            tapHandler();
            let temp = wallet.wallets.filter(
              (val: Wallet) => val.walletAddress !== wallet.ariseWallet?.walletAddress
            );
            setWallet({ type: 'setWallets', payload: temp });
            dispatch({ type: 'setUserInfo', payload: null });
            dispatch({ type: 'setIsLogin', payload: false });
            setWallet({ type: 'setAriseWallet', payload: null });

            navigation.replace('AuthRouter', { screen: 'OpeningScreen' });
          }}
        >
          <Text ml={3} mt={8} mb={1} fontWeight={'bold'}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SideMenuModal;

const styles = StyleSheet.create({
  body: {
    width: width * 0.75,
    flex: 1,
    height: height,
    backgroundColor: 'white',
    elevation: 4
  },
  image: {
    width: width / 10,
    height: width / 10
  }
});
