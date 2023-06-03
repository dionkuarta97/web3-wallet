import { Actionsheet, Center, Text, View } from 'native-base';
import { Colors } from '../../../Colors';
import { Image, Pressable, StyleSheet, TextInput, Keyboard, KeyboardEvent } from 'react-native';
import { width } from '../../../Helpers';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { authReducer } from '../../../state/auth/authReducer';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  buttonText: string;
  desc: string & {};
  onTrue: (val: boolean) => void;
};

const InputPinBottomSheet = ({ onClose, isOpen, buttonText, onTrue, desc }: Props) => {
  const [user] = useAtom(authReducer);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [focus, setFocus] = useState(false);
  const [pin, setPin] = useState<string | null>(null);
  const [showPin, setShowPin] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    function onKeyboardDidShow(e: KeyboardEvent) {
      setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
      setKeyboardHeight(0);
    }

    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={() => {
        setError(null);
        setPin(null);
        onClose();
        setFocus(false);
        setShowPin(true);
      }}
    >
      <Actionsheet.Content bottom={keyboardHeight}>
        <Center>
          <Text fontWeight={'bold'} fontSize={17} marginBottom={4}>
            Warning
          </Text>
          <Text color={Colors.green} mb={4} textAlign={'center'}>
            {desc}
          </Text>
        </Center>
        <Text ml={8} mb={1} fontSize={14} color={Colors.green} alignSelf={'flex-start'}>
          Pin
        </Text>
        <View justifyContent={'center'}>
          <TextInput
            value={pin}
            onChangeText={(val) => setPin(val)}
            secureTextEntry={showPin}
            onFocus={() => setFocus(true)}
            onBlur={() => {
              setFocus(false);
              setShowPin(true);
            }}
            placeholder="Enter your Pin"
            style={[
              style.input,
              {
                borderColor: focus ? 'black' : Colors.gray
              }
            ]}
          />
          <Image
            style={style.imgLeft}
            source={
              focus
                ? require('../../../../assets/icon/lockBlack.png')
                : require('../../../../assets/icon/lock.png')
            }
          />
          <Pressable
            onPress={() => {
              setShowPin(!showPin);
            }}
            disabled={focus ? false : true}
            style={({ pressed }) => [
              {
                transform: [
                  {
                    scale: pressed ? 0.96 : 1
                  }
                ],
                left: width * 0.75,
                position: 'absolute'
              }
            ]}
          >
            <Image
              style={style.imgRight}
              source={
                !focus
                  ? require('../../../../assets/icon/eye.png')
                  : !showPin
                  ? require('../../../../assets/icon/eye-slash.png')
                  : require('../../../../assets/icon/eyeBlack.png')
              }
            />
          </Pressable>
        </View>
        {error && (
          <Text mt={2} color={'red.500'}>
            Wrong Pin
          </Text>
        )}
        <Pressable
          onPress={() => {
            if (user.userInfo.pin !== Number(pin)) {
              setError(true);
            } else {
              onClose();
              setError(false);
              onTrue(true);
              setPin(null);
              setFocus(false);
              setShowPin(true);
            }
          }}
          disabled={!pin ? true : false}
          style={({ pressed }) => [
            {
              transform: [
                {
                  scale: pressed ? 0.98 : 1
                }
              ],
              padding: 11,
              borderRadius: 15,
              width: width / 1.8,
              backgroundColor: !pin ? Colors.neutral50 : pressed ? Colors.lightGreen : Colors.green,
              marginTop: 30,
              marginBottom: 10
            }
          ]}
        >
          <Text alignSelf={'center'} fontSize={16} fontWeight={'semibold'} color={'white'}>
            {buttonText}
          </Text>
        </Pressable>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default InputPinBottomSheet;

const style = StyleSheet.create({
  input: {
    borderRadius: 6,
    borderWidth: 0.7,
    paddingHorizontal: width * 0.11,
    width: width / 1.2
  },
  imgLeft: {
    height: 20,
    width: 20,
    left: width * 0.03,
    position: 'absolute'
  },
  imgRight: {
    height: 20,
    width: 20
  }
});
