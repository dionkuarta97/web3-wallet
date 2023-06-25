import { HStack, ScrollView, Text, VStack, View } from 'native-base';
import { Image, Pressable, TextInput, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { height, width } from '../../../Helpers';
import { Colors } from '../../../Colors';
import { memo, useState } from 'react';
import { useAtom } from 'jotai';
import { walletReducer } from '../../../state/wallet/walletReducer';
type Props = {
  show: boolean;
  onClose: () => void;
  onTap: (val: string) => void;
};

const ModalFrom = ({ onTap, show, onClose }: Props) => {
  const [wallet] = useAtom(walletReducer);
  return (
    <Modal
      customBackdrop={
        <TouchableWithoutFeedback
          onPress={() => {
            onClose();
          }}
        >
          <View bg={'black'} opacity={0.5} style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      }
      style={{
        justifyContent: 'flex-end',
        margin: 0
      }}
      isVisible={show}
    >
      <View bg={'white'} px={8} height={height / 2.5} borderTopRadius={20} width={width}>
        <View
          my={4}
          alignSelf={'center'}
          width={width / 3}
          borderTopWidth={3}
          borderRadius={20}
          borderColor={Colors.green}
        />
        <Text alignSelf={'center'} fontWeight={'bold'} fontSize={16}>
          Choose Your Wallet
        </Text>
        <View
          mt={2}
          mb={4}
          alignSelf={'center'}
          width={width}
          borderTopWidth={1}
          borderRadius={20}
          borderColor={Colors.green}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {wallet.wallets.map((el, idx) => (
            <Pressable
              onPress={() => {
                onTap(el.walletName);
                onClose();
              }}
              style={({ pressed }) => [
                {
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderColor: idx + 1 === wallet.wallets.length ? 'white' : Colors.green,
                  opacity: pressed ? 0.6 : 1
                }
              ]}
              key={idx}
            >
              <Text>{el.walletName}</Text>
              <Image
                source={require('../../../../assets/icon/arrow-kanan.png')}
                style={{
                  resizeMode: 'contain',
                  width: 20,
                  height: 20,
                  marginLeft: 'auto'
                }}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default memo(ModalFrom);
