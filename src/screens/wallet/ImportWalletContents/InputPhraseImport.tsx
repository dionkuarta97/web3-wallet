import { Image, StyleSheet, TextInput } from 'react-native';
import { width } from '../../../Helpers';
import { View } from 'native-base';
import LockBlack from '../../../../assets/icon/lockBlack.png';
import Lock from '../../../../assets/icon/lock.png';
import { MutableRefObject, useState } from 'react';
import { Colors } from '../../../Colors';

type Props = {
  onChange: (val: string) => void;
  value: string;
  onFocused: (val: boolean) => void;
  refInput: MutableRefObject<TextInput>;
};

const InputPhraseImport = ({ onChange, onFocused, value, refInput }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View justifyContent={'center'}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        ref={refInput}
        multiline={true}
        value={value}
        onFocus={() => {
          setIsFocused(true);
          onFocused(true);
        }}
        placeholder="Enter your Passphrase"
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
      <Image source={isFocused ? LockBlack : value !== '' ? LockBlack : Lock} style={style.img} />
    </View>
  );
};

export default InputPhraseImport;

const style = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderRadius: 6,
    borderWidth: 1,
    paddingLeft: width * 0.13
  },
  img: {
    height: 25,
    width: 25,
    left: width * 0.03,
    position: 'absolute'
  }
});
