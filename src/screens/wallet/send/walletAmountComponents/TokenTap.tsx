import { Text, View } from 'native-base';
import { Image, Pressable } from 'react-native';
import { height } from '../../../../Helpers';
import { Colors } from '../../../../Colors';
import { useState } from 'react';
import ModalToken from './ModalToken';

type Props = {
  value: string & {};
  logo?: string & {};
  onTap: (val: {
    name: string;
    symbol: string;
    balance: number;
    network: string;
    price: number;
    logo: string;
  }) => void;
};

const TokenTap = ({ value, onTap, logo }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setShow(true)}
        style={({ pressed }) => [
          {
            width: '50%',
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
        {logo && (
          <Image
            source={{ uri: logo }}
            style={{
              resizeMode: 'contain',
              width: 20,
              height: 20,
              marginRight: 8
            }}
          />
        )}

        <Text width={'70%'} numberOfLines={1} color={Colors.green}>
          {value}
        </Text>
        <Image
          source={require('../../../../../assets/icon/arrow-down-black.png')}
          style={{
            resizeMode: 'contain',
            width: 20,
            height: 20,
            marginLeft: 'auto'
          }}
        />
      </Pressable>
      <ModalToken onTap={onTap} show={show} onClose={() => setShow(false)} />
    </>
  );
};

export default TokenTap;
