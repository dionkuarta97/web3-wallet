import { GestureResponderEvent, ImageSourcePropType, SafeAreaView, StyleSheet } from 'react-native';
import HeaderSignIn from './signInContent/HeaderSignIn';
import InputEmail from './signInContent/InputEmail';
import { height, width } from '../../Helpers';
import { Button, Center, HStack, Text, View } from 'native-base';
import { Colors } from '../../Colors';
import InputPassword from './signInContent/InputPassword';
import facebook from '../../../assets/icon/facebook.png';
import google from '../../../assets/icon/google.png';
import { loginEmailPassword, loginFacebook, loginGoogle } from '../../api/auth';
import SocialLogin from './signInContent/SocialLogin';
import { useAtom } from 'jotai';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from '../../navigations/AuthRouter';
import { authReducer } from '../../state/auth/authReducer';
import { Alert } from 'react-native';
import { useState } from 'react';

const socials: { image: ImageSourcePropType; handle: () => Promise<any> }[] = [
  {
    image: facebook,
    handle: () => {
      return new Promise((resolve, reject) => {
        loginFacebook()
          .then((val) => {
            resolve(val);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  },
  {
    image: google,
    handle: () => {
      return new Promise((resolve, reject) => {
        loginGoogle()
          .then((val) => {
            resolve(val);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  }
];

const SignInScreen = () => {
  const [auth, dispatch] = useAtom(authReducer);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  const handleEmailPasswordLogin = async (event: GestureResponderEvent) => {
    // TODO: Add email & password validation
    const userInfo: any = await loginEmailPassword(email, password);
    console.log({ userInfo });
    if (auth?.userInfo?.pin) {
      dispatch({ type: 'setUserInfo', payload: { ...userInfo, pin: auth.userInfo.pin } });
      navigation.navigate('InputPinScreen');
    } else {
      dispatch({ type: 'setUserInfo', payload: { ...userInfo, pin: null } });
      navigation.navigate('SetupPinScreen');
    }
  }

  return (
    <View style={style.container}>
      <View flex={1}>
        <HeaderSignIn />
        <View style={style.input}>
          <Text marginBottom={2} color={Colors.green}>
            Email Address
          </Text>
          <InputEmail onChangeText={(text) => setEmail(text)} />
          <Text marginBottom={2} mt={5} color={Colors.green}>
            Password
          </Text>
          <InputPassword onChangeText={(text) => setPassword(text)} />
        </View>
        <View alignItems={'flex-end'}>
          <Button
            colorScheme={Colors.gray}
            padding={1}
            mt={1}
            variant={'link'}
            size="sm"
            _text={{
              color: Colors.gray,
              fontSize: 13,
              fontWeight: 'semibold'
            }}
          >
            Forgot Password?
          </Button>
        </View>
        <Center marginTop={8}>
          <Button
            onPress={handleEmailPasswordLogin}
            bg={Colors.green}
            _pressed={{
              bg: Colors.lightGreen
            }}
            borderRadius={12}
            width={width / 1.5}
          >
            Sign In
          </Button>
        </Center>
        <View mt={height / 20} alignItems={'center'}>
          <Text color={Colors.grayText}>Or continue with</Text>
        </View>
        <HStack space={4} mt={height / 20} justifyContent={'center'}>
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
        mb={4}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text color={Colors.grayText}>Don’t have an account? Please</Text>
        <Button
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
          Register
        </Button>
      </View>
    </View>
  );
};

export default SignInScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 26
  },
  input: {
    marginTop: height * 0.1
  }
});
