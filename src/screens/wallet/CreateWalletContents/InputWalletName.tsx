import { Image, StyleSheet, TextInput } from 'react-native';
import { width } from '../../../Helpers';
import { View } from 'native-base';
import Wallet from '../../../../assets/icon/wallet.png';
import WalletGray from '../../../../assets/icon/walletGray.png';
import { MutableRefObject, useState } from 'react';
import { Colors } from '../../../Colors';

type Props = {
  onChange: (val: string) => void;
  value: string;
  onFocused: (val: boolean) => void;
  refInput: MutableRefObject<TextInput>;
};

const InputWalletName = ({ onChange, onFocused, value, refInput }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View justifyContent={'center'}>
      <TextInput
        ref={refInput}
        value={value}
        onFocus={() => {
          setIsFocused(true);
          onFocused(true);
        }}
        placeholder="Enter your wallet name"
        onBlur={() => {
          setIsFocused(false);
          onFocused(false);
        }}
        onChangeText={(val) => {
          onChange(val);
        }}
        style={[
          style.input,
          { borderColor: isFocused ? 'black' : value !== '' ? 'black' : Colors.neutral50 }
        ]}
      />
      <Image source={isFocused ? Wallet : value !== '' ? Wallet : WalletGray} style={style.img} />
    </View>
  );
};

export default InputWalletName;

const style = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderRadius: 6,
    borderWidth: 0.5,
    paddingLeft: width * 0.13
  },
  img: {
    height: 25,
    width: 25,
    left: width * 0.03,
    position: 'absolute'
  }
});
