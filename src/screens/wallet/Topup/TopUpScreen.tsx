import { Center, Text, View } from 'native-base';
import DefaultBody from '../../../components/DefaultBody';
import { Colors } from '../../../Colors';
import { width } from '../../../Helpers';
import { useRoute } from '@react-navigation/core';
import { WalletRouteProps } from '../../../navigations/WalletRouter';
import TokenTap from './topupComponents/tokenTap';
import { useState } from 'react';

const TopUpScreen = () => {
  const route = useRoute<WalletRouteProps<'TopUpScreen'>>();
  const [show, setShow] = useState(false);

  return (
    <DefaultBody>
      <View flex={1}>
        <Center>
          <Text fontSize={width / 20} fontWeight={'bold'} color={Colors.green}>
            Buy
          </Text>
          <View
            style={{
              borderTopWidth: 4,
              width: width / 2.2,
              borderRadius: 15,
              marginTop: 3,
              borderTopColor: Colors.green
            }}
          />
        </Center>
        <Text mt={8} ml={2} mb={1}>
          Token
        </Text>
        <TokenTap show={show} setShow={(val) => setShow(!show)} />
      </View>
    </DefaultBody>
  );
};

export default TopUpScreen;
