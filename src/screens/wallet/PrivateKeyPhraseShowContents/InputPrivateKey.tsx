import { Image, StyleSheet, TextInput } from 'react-native';
import { width } from '../../../Helpers';
import { View } from 'native-base';
import Key from '../../../../assets/icon/key.png';
import { Colors } from '../../../Colors';

type Props = {
  value: string & {};
};

const InputPrivateKey = ({ value }: Props) => {
  return (
    <View justifyContent={'center'}>
      <TextInput editable={false} value={value} style={style.input} multiline={true} />
      <Image source={Key} style={style.img} />
    </View>
  );
};

export default InputPrivateKey;

const style = StyleSheet.create({
  input: {
    borderColor: Colors.neutral50,
    borderRadius: 6,
    borderWidth: 0.5,
    paddingLeft: width * 0.13,
    color: Colors.neutral50
  },
  img: {
    height: 25,
    width: 25,
    left: width * 0.03,
    position: 'absolute'
  }
});
