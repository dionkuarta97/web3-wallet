import { ImageSourcePropType, SafeAreaView, StyleSheet } from 'react-native';
import HeaderSignIn from './signInContent/HeaderSignIn';
import InputEmail from './signInContent/InputEmail';
import { height, width } from '../../Helpers';
import { Button, Center, HStack, Text, View } from 'native-base';
import { Colors } from '../../Colors';
import InputPassword from './signInContent/InputPassword';
import facebook from '../../../assets/icon/facebook.png';
import google from '../../../assets/icon/google.png';
import { loginFacebook, loginGoogle } from '../../api/auth';
import SocialLogin from './signInContent/SocialLogin';
import { useAtom } from 'jotai';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from '../../navigations/AuthRouter';
import { authReducer } from '../../state/auth/authReducer';

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
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  return (
    <View style={style.container}>
      <View flex={1}>
        <HeaderSignIn />
        <View style={style.input}>
          <Text marginBottom={2} color={Colors.green}>
            Email Address
          </Text>
          <InputEmail />
          <Text marginBottom={2} mt={5} color={Colors.green}>
            Password
          </Text>
          <InputPassword />
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
                el.handle().then((val) => {
                  if (auth?.userInfo?.pin) {
                    dispatch({ type: 'setUserInfo', payload: { ...val, pin: auth.userInfo.pin } });
                    navigation.navigate('InputPinScreen');
                  } else {
                    dispatch({ type: 'setUserInfo', payload: { ...val, pin: null } });
                    navigation.navigate('SetupPinScreen');
                  }
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
