import { View } from 'native-base';
import { StyleSheet, TextInput, Image } from 'react-native';
import { width } from '../../../Helpers';
import { Colors } from '../../../Colors';

const InputEmail = () => {
  return (
    <View justifyContent={'center'}>
      <TextInput placeholder="Enter your email" editable={false} style={style.input} />
      <Image style={style.img} source={require('../../../../assets/icon/sms.png')} />
    </View>
  );
};

export default InputEmail;

const style = StyleSheet.create({
  input: {
    borderColor: Colors.gray,
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
