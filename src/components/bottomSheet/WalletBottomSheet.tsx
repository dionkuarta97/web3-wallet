import React from 'react';

import { Actionsheet, Button, HStack, Heading, Text } from 'native-base';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { Colors } from '../../Colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAtom } from 'jotai';
import { BottomTabParamList } from '../../navigations/BottomTabRouter';
import { bottomReducer } from '../../state/bottom/bottomReducer';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const WalletBottomSheet = ({ onClose = () => {}, isOpen = false }: Props) => {
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();
  const [, dispatch] = useAtom(bottomReducer);
  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <Actionsheet.Content>
        <Heading>Connect Wallet</Heading>
        <Text mb={4} mt={2}>
          Please choose one for your wallet
        </Text>
        <HStack space={4} mb={5}>
          <Button
            bg={Colors.green}
            _pressed={{
              bg: Colors.lightGreen
            }}
            leftIcon={
              <Image
                style={{
                  width: 25,
                  height: 25
                }}
                source={require('../../../assets/icon/empty-wallet-add.png')}
                resizeMode="contain"
              />
            }
            onPress={() => {
              onClose();
              dispatch({ type: 'setTabActive', payload: 'ConnectScreen' });
              navigation.navigate('WalletRouter', { screen: 'CreateWalletScreen' });
            }}
            width={Dimensions.get('screen').width / 2.4}
          >
            New Wallet
          </Button>
          <Button
            bg={'white'}
            borderColor={'black'}
            borderWidth={1}
            onPress={() => {
              onClose();
            }}
            _pressed={{
              bg: Colors.gray
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
                source={require('../../../assets/icon/wallet-search.png')}
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

export default WalletBottomSheet;
