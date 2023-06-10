import { Button, HStack, ScrollView, Text, View } from 'native-base';
import { useCallback, useState } from 'react';
import { Colors } from '../../../Colors';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import InputRePassword from './InputRePassword';
import { Image, Pressable } from 'react-native';
import { formatEmail, height, width } from '../../../Helpers';
import DefaultModal from '../../../components/modal/DefaultModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from '../../../navigations/AuthRouter';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { authReducer } from '../../../state/auth/authReducer';
import { registerEmailPassword } from '../../../api/auth';
import { Alert } from 'react-native';
import LoadingModal from '../../../components/modal/LoadingModal';
import { socials } from '../SignInScreen';
import SocialLogin from '../signInContent/SocialLogin';

const SignUpContent = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, dispatch] = useAtom(authReducer);

  const handleEmailPasswordRegister = () => {
    // TODO: Add email & password validation
    setLoading(true);
    console.log(email, 'email');

    registerEmailPassword(email, password)
      .then(() => {
        navigation.navigate('EmailVerificationScreen', { email: email });
      })
      .catch((err) => {
        Alert.alert('error', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(email);

  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  return (
    <ScrollView keyboardShouldPersistTaps={'never'} showsVerticalScrollIndicator={false} flex={1}>
      {loading && <LoadingModal />}
      <Text mt={8} color={Colors.green} marginBottom={2}>
        Email Address
      </Text>
      <InputEmail
        onChange={(val) => {
          console.log(val);
          setEmail(val);
        }}
        isDisable={isChecked}
      />
      <Text color={Colors.green} marginBottom={1}>
        Password
      </Text>
      <InputPassword
        isDisable={isChecked}
        onChangeText={(val) => {
          setPassword(val);
        }}
      />
      <Text color={Colors.green} marginBottom={1}>
        Confirm Password
      </Text>
      <InputRePassword
        isDisable={isChecked}
        pass={password}
        onChangeText={(val) => {
          setRePassword(val);
        }}
      />
      <Pressable
        disabled={
          !formatEmail(email) || password === '' || rePassword === '' || password !== rePassword
            ? true
            : false
        }
        onPress={() => {
          if (isChecked) {
            setIsChecked(false);
          } else {
            setShowModal(true);
          }
        }}
      >
        {({ pressed }) => (
          <View flexDirection={'row'}>
            <Image
              style={{
                transform: [
                  {
                    scale: pressed ? 1.1 : 1
                  }
                ],
                resizeMode: 'contain',
                width: 15,
                height: 15,
                marginRight: 5,
                marginTop: 4
              }}
              source={
                isChecked
                  ? require('../../../../assets/icon/isCheck.png')
                  : require('../../../../assets/icon/unCheck.png')
              }
            />
            <View opacity={pressed ? 0.6 : 1}>
              <Text color={Colors.grayText}>
                By signing up, you’re agree to our{' '}
                <Text color={'black'} fontWeight={'semibold'}>
                  Terms of Use
                </Text>{' '}
                and{' '}
                <Text color={'black'} fontWeight={'semibold'}>
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </View>
        )}
      </Pressable>
      {showModal && (
        <DefaultModal
          header={
            <View padding={4}>
              <Text fontSize={24} color={'white'} fontWeight={'semibold'}>
                Terms of Use
              </Text>
            </View>
          }
          footer={
            <Button
              bg={Colors.green}
              _pressed={{ bg: Colors.lightGreen }}
              onPress={() => {
                setIsChecked(true);
                setShowModal(false);
              }}
              width={width * 0.5}
              borderRadius={12}
            >
              I Agree
            </Button>
          }
          body={
            <View mt={4}>
              <Text textAlign={'justify'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
                velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
                condimentum lobortis. Ut commodo efficitur neque.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
                odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo
                efficitur neque.
              </Text>
            </View>
          }
        />
      )}

      <Button
        alignSelf={'center'}
        bg={isChecked ? Colors.green : Colors.gray}
        disabled={isChecked ? false : true}
        onPress={() => {
          handleEmailPasswordRegister();
        }}
        _pressed={{ bg: Colors.lightGreen }}
        borderRadius={12}
        width={width * 0.6}
        mt={height * 0.04}
      >
        <Text fontWeight={'semibold'} color={'white'}>
          Create an account
        </Text>
      </Button>
      <View mt={5} alignItems={'center'}>
        <Text color={Colors.grayText}>Or continue with</Text>
        <HStack space={4} mt={height / 30} justifyContent={'center'}>
          {socials.map((el, idx) => (
            <SocialLogin
              onPress={() => {
                el.handle()
                  .then((val) => {
                    if (auth?.userInfo?.pin) {
                      dispatch({
                        type: 'setUserInfo',
                        payload: { ...val, pin: auth.userInfo.pin }
                      });
                      navigation.navigate('InputPinScreen');
                    } else {
                      dispatch({ type: 'setUserInfo', payload: { ...val, pin: null } });
                      navigation.navigate('SetupPinScreen');
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    Alert.alert('Error', JSON.stringify(err, null, 2));
                  });
              }}
              image={el.image}
              key={idx}
            />
          ))}
        </HStack>
      </View>
      <View
        fontSize={14}
        flexDirection={'row'}
        mt={5}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text color={Colors.grayText}>Already have an account? Please</Text>
        <Button
          onPress={() => navigation.navigate('SignInScreen')}
          colorScheme={'gray'}
          padding={1}
          variant={'link'}
          size="sm"
          _text={{
            color: 'black',
            fontSize: 14,
            fontWeight: 'semibold'
          }}
        >
          Login
        </Button>
      </View>
    </ScrollView>
  );
};

export default SignUpContent;
