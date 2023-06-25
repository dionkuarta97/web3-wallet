import { Text } from 'native-base';
import { Image, Pressable } from 'react-native';
import { height } from '../../../Helpers';
import { Colors } from '../../../Colors';
import { useState } from 'react';
import ModalFrom from './ModalFrom';

type Props = {
  value?: string & {};
  onTap: (val: string) => void;
};

const FromTap = ({ value, onTap }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
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

        <Text width={'70%'} numberOfLines={1} color={value ? Colors.green : Colors.grayText}>
          {value ? value : 'Choose your wallet'}
        </Text>
        <Image
          source={require('../../../../assets/icon/arrow-down-black.png')}
          style={{
            resizeMode: 'contain',
            width: 20,
            height: 20,
            marginLeft: 'auto'
          }}
        />
      </Pressable>
      <ModalFrom onTap={onTap} onClose={() => setShow(false)} show={show} />
    </>
  );
};

export default FromTap;
