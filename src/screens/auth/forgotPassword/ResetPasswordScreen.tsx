import { Text, View } from 'native-base';
import { Colors } from '../../../Colors';
import { useEffect, useState } from 'react';
import InputPassword from '../signupContent/InputPassword';
import InputRePassword from '../signupContent/InputRePassword';
import { Pressable } from 'react-native';
import { height, width } from '../../../Helpers';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from '../../../navigations/AuthRouter';

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState(null);
  const [rePassword, setRepassword] = useState(null);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (rePassword) {
      if (rePassword === password) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    }
  }, [rePassword]);

  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  return (
    <View flex={1} bg={'white'} p={5}>
      <View flex={1}>
        <Text mt={8} mb={4} fontSize={22} fontWeight={'bold'} color={Colors.green}>
          New Password
        </Text>
        <Text color={Colors.grayText}>Please enter a new password below</Text>
        <Text mt={16} mb={2} ml={2}>
          Password
        </Text>
        <InputPassword
          onChangeText={(val) => {
            console.log(val);

            setPassword(val);
          }}
        />
        <Text mt={4} mb={2} ml={2}>
          Confirm Password
        </Text>
        <InputRePassword
          pass={password}
          onChangeText={(val) => {
            setRepassword(val);
          }}
        />
      </View>
      <Pressable
        disabled={isDisable}
        onPress={() => {
          navigation.navigate('SuccessReset');
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
          Reset Password
        </Text>
      </Pressable>
    </View>
  );
};

export default ResetPasswordScreen;
