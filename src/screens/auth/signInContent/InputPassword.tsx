import { View } from 'native-base';
import { StyleSheet, TextInput, Image } from 'react-native';
import { width } from '../../../Helpers';
import { Colors } from '../../../Colors';

const InputPassword = () => {
  return (
    <View justifyContent={'center'}>
      <TextInput placeholder="Enter your Password" editable={false} style={style.input} />
      <Image style={style.imgLeft} source={require('../../../../assets/icon/lock.png')} />
      <Image style={style.imgRight} source={require('../../../../assets/icon/eye.png')} />
    </View>
  );
};

export default InputPassword;

const style = StyleSheet.create({
  input: {
    borderColor: Colors.gray,
    borderRadius: 6,
    borderWidth: 0.5,
    paddingLeft: width * 0.13
  },
  imgLeft: {
    height: 25,
    width: 25,
    left: width * 0.03,
    position: 'absolute'
  },
  imgRight: {
    height: 25,
    width: 25,
    left: width * 0.8,
    position: 'absolute'
  }
});