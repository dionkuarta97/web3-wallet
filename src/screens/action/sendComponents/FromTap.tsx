import { Text, View } from 'native-base';
import { Image, Pressable } from 'react-native';
import { height } from '../../../Helpers';
import { Colors } from '../../../Colors';
import { useState } from 'react';
import ModalFrom from './ModalFrom';
import DropDown from './DropDown';

type Props = {
  value?: string & {};
  show: boolean;
  setShow: (val: boolean) => void;
};

const FromTap = ({ value, setShow, show }: Props) => {
  return (
    <View>
      <Pressable
        onPress={() => setShow(true)}
        style={({ pressed }) => [
          {
            borderWidth: 1,
            flexDirection: 'row',
            paddingHorizontal: 8,
            height: height / 18,
            alignItems: 'center',
            borderColor: Colors.green,
            borderRadius: 10
          }
        ]}
      >
        <Image
          source={
            value
              ? require('../../../../assets/icon/wallet.png')
              : require('../../../../assets/icon/walletGray.png')
          }
          style={{
            resizeMode: 'contain',
            width: 20,
            height: 20,
            marginRight: 8
          }}
        />

        <Text
          ellipsizeMode="middle"
          width={'70%'}
          numberOfLines={1}
          color={value ? Colors.green : Colors.grayText}
        >
          {value ? value : 'Choose your wallet'}
        </Text>
        <Image
          source={
            !show
              ? require('../../../../assets/icon/arrow-down-black.png')
              : require('../../../../assets/icon/arrow-up-black.png')
          }
          style={{
            resizeMode: 'contain',
            width: 20,
            height: 20,
            marginLeft: 'auto'
          }}
        />
      </Pressable>

      {/* <ModalFrom onTap={onTap} onClose={() => setShow(false)} show={show} /> */}
    </View>
  );
};

export default FromTap;
