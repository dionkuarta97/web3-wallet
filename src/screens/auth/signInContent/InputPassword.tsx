import { View } from 'native-base';
import { StyleSheet, TextInput, Image, Pressable } from 'react-native';
import { height, width } from '../../../Helpers';
import { Colors } from '../../../Colors';
import { useCallback, useState } from 'react';

const InputPassword = ({
  disabled = false,
  onChangeText = () => {}
}: {
  disabled?: boolean;
  onChangeText?: (text: string) => void;
}) => {
  const [foccus, setFoccus] = useState(false);
  const [show, setShow] = useState(false);
  const handleSetFocus = useCallback((val: boolean) => {
    setFoccus(val);
  }, []);
  const handleSetShow = useCallback((val: boolean) => {
    setShow(val);
  }, []);
  return (
    <View justifyContent={'center'}>
      <TextInput
        onFocus={() => {
          handleSetFocus(true);
        }}
        onBlur={() => {
          handleSetFocus(false);
        }}
        secureTextEntry={!show}
        placeholder="Enter your Password"
        editable={!disabled}
        style={[
          style.input,
          {
            borderColor: foccus ? 'black' : Colors.gray
          }
        ]}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
      <Image
        style={style.imgLeft}
        source={
          foccus
            ? require('../../../../assets/icon/lockBlack.png')
            : require('../../../../assets/icon/lock.png')
        }
      />
      {!show ? (
        <Pressable
          onPress={() => {
            handleSetShow(true);
          }}
          style={({ pressed }) => [
            {
              right: width * 0.03,
              position: 'absolute',
              transform: [{ scale: pressed ? 0.98 : 1 }]
            }
          ]}
        >
          <Image
            style={style.imgRight}
            source={
              foccus
                ? require('../../../../assets/icon/eyeBlack.png')
                : require('../../../../assets/icon/eye.png')
            }
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            handleSetShow(false);
          }}
          style={({ pressed }) => [
            {
              right: width * 0.03,
              position: 'absolute',
              transform: [{ scale: pressed ? 0.98 : 1 }]
            }
          ]}
        >
          <Image
            style={style.imgRight}
            source={
              foccus
                ? require('../../../../assets/icon/eye-slash.png')
                : require('../../../../assets/icon/eye-slash-gray.png')
            }
          />
        </Pressable>
      )}
    </View>
  );
};

export default InputPassword;

const style = StyleSheet.create({
  input: {
    borderColor: Colors.gray,
    borderRadius: 6,
    borderWidth: 0.8,
    paddingLeft: width * 0.13,
    height: height / 18
  },
  imgLeft: {
    height: 25,
    width: 25,
    left: width * 0.03,
    position: 'absolute'
  },
  imgRight: {
    height: 25,
    width: 25
  }
});
