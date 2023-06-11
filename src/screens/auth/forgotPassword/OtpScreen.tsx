import { HStack, Text, View } from 'native-base';
import { Colors } from '../../../Colors';
import { height, width } from '../../../Helpers';
import OtpInput from './otpComponnents/OtpInput';
import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import CountDown from 'react-native-countdown-component';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from '../../../navigations/AuthRouter';

const OtpScreen = () => {
  const [input1, setInput1] = useState(null);
  const [input2, setInput2] = useState(null);
  const [input3, setInput3] = useState(null);
  const [input4, setInput4] = useState(null);

  const [isDisable, setIsDisable] = useState(true);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(60);

  const ref1 = useRef<TextInput>();
  const ref2 = useRef<TextInput>();
  const ref3 = useRef<TextInput>();
  const ref4 = useRef<TextInput>();
  useEffect(() => {
    ref1.current?.focus();
    setShow(true);
  }, []);

  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  return (
    <View p={5} flex={1} bg={'white'}>
      <View alignItems={'center'} bg={'white'} flex={1}>
        <Text color={Colors.green} mt={8} fontWeight={'bold'} fontSize={22} textAlign={'center'}>
          Verification Code
        </Text>
        <Text m={4} textAlign={'center'} color={Colors.grayText} width={width / 1.4}>
          Verification code has been sent to your email address
        </Text>
        <Text color={Colors.green} m={4}>
          OTP
        </Text>
        <HStack mb={4} space={4}>
          <OtpInput
            onFull={() => {
              ref2.current?.focus();
            }}
            value={input1}
            onChange={(val) => {
              setInput1(val);
              if (val) {
                ref2.current?.focus();
              }
            }}
            refInput={ref1}
          />
          <OtpInput
            onFull={() => {
              ref3.current?.focus();
            }}
            onDelete={() => {
              if (input2) {
                setInput2(null);
              } else {
                ref1.current?.focus();
                setInput1(null);
              }
            }}
            value={input2}
            onChange={(val) => {
              setInput2(val);
              if (val) {
                ref3.current?.focus();
              }
            }}
            refInput={ref2}
          />
          <OtpInput
            onFull={() => {
              ref4.current?.focus();
            }}
            value={input3}
            onDelete={() => {
              if (input3) {
                setInput3(null);
              } else {
                ref2.current?.focus();
                setInput2(null);
              }
            }}
            onChange={(val) => {
              setInput3(val);
              if (val) {
                ref4.current?.focus();
              }
            }}
            refInput={ref3}
          />
          <OtpInput
            onFull={() => {}}
            value={input4}
            onDelete={() => {
              if (input4) {
                setInput4(null);
                setIsDisable(true);
              } else {
                ref3.current?.focus();
                setIsDisable(true);
                setInput3(null);
              }
            }}
            onChange={(val) => {
              setInput4(val);
              if (val) {
                setIsDisable(false);
              }
            }}
            refInput={ref4}
          />
        </HStack>
        <HStack alignItems={'center'}>
          <Text color={Colors.green}>Time Remaining</Text>

          <CountDown
            key={'Count 1'}
            until={time}
            onFinish={() => console.log('finished')}
            size={13}
            digitStyle={{ width: width / 20 }}
            digitTxtStyle={{ color: Colors.green }}
            timeToShow={['M', 'S']}
            timeLabels={{ m: null, s: null }}
            showSeparator
            separatorStyle={{ color: Colors.green, marginHorizontal: -1 }}
          />
        </HStack>
        <Text color={Colors.green}>
          Don’t receive the OTP? <Text underline>Resend OTP</Text>
        </Text>
      </View>
      <Pressable
        disabled={isDisable}
        onPress={() => {
          setTime(0);
          navigation.navigate('ResetPasswordScreen');
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
          Continue
        </Text>
      </Pressable>
    </View>
  );
};

export default OtpScreen;
