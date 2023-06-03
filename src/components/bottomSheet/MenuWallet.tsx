import React from 'react';
import { Actionsheet, Button, HStack, Heading, Text } from 'native-base';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { Colors } from '../../Colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAtom } from 'jotai';
import { bottomReducer } from '../../state/bottom/bottomReducer';
import { walletReducer } from '../../state/wallet/walletReducer';
import { BottomTabParamList } from '../../navigations/BottomTabRouter';

type Props = {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
};

const MenuWallet = ({ onClose = () => {}, onOpen = () => {}, isOpen = false }: Props) => {
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();
  const [, dispatch] = useAtom(bottomReducer);
  const [wallet, disWallet] = useAtom(walletReducer);

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <Actionsheet.Content>
        <Heading m={5}>Wallet</Heading>

        <HStack space={4} m={5}>
          <Button
            bg={'white'}
            borderColor={'black'}
            _pressed={{
              bg: Colors.neutral25
            }}
            _text={{
              color: 'black'
            }}
            borderWidth={1}
            leftIcon={
              <Image
                style={{
                  width: 25,
                  height: 25
                }}
                source={require('../../../assets/icon/wallet.png')}
                resizeMode="contain"
              />
            }
            onPress={() => {
              onClose();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'WalletRouter', params: { screen: 'AllWalletScreen' } }]
                })
              );
            }}
            width={Dimensions.get('screen').width / 2.4}
          >
            All
          </Button>
          <Button
            bg={'white'}
            borderColor={'black'}
            borderWidth={1}
            onPress={() => {
              onOpen();
              onClose();
            }}
            _pressed={{
              bg: Colors.neutral25
            }}
            _text={{
              color: 'black'
            }}
            leftIcon={
              <Image
                style={{
                  width: 25,
                  height: 25
                }}
                source={require('../../../assets/icon/wallet-add.png')}
                resizeMode="contain"
              />
            }
            width={Dimensions.get('screen').width / 2.4}
          >
            Import Wallet
          </Button>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default MenuWallet;
