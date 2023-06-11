import { Text, View } from 'native-base';
import { Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';
import { formatEmail, height, width } from '../../Helpers';
import { Colors } from '../../Colors';
import InputEmail from './signInContent/InputEmail';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from '../../navigations/AuthRouter';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  useEffect(() => {
    if (!formatEmail(email)) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email]);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{
        flex: 1
      }}
    >
      <View bg={'white'} p={5} flex={1}>
        <View flex={1} justifyContent={'center'}>
          <Text fontWeight={'bold'} fontSize={22}>
            Forgot your password?
          </Text>
          <Text my={4} color={Colors.grayText} width={width / 1.4}>
            Please enter your email address below to receive your verification code
          </Text>
          <Text ml={2} mb={1}>
            Email Address
          </Text>
          <InputEmail
            onChange={(val) => {
              setEmail(val);
            }}
          />
        </View>
        <Pressable
          disabled={isDisable}
          onPress={() => {
            navigation.navigate('SendVerification');
          }}
          style={({ pressed }) => [
            {
              borderRadius: 10,
              alignSelf: 'center',
              marginVertical: height / 40,
              paddingHorizontal: width / 5,
              paddingVertical: 10,
              backgroundColor: isDisable
                ? Colors.neutral50
                : pressed
                ? Colors.lightGreen
                : Colors.green
            }
          ]}
        >
          <Text fontWeight={'bold'} color={'white'}>
            Reset password
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordScreen;
