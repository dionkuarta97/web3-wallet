import { SafeAreaView, StyleSheet } from 'react-native';
import HeaderSignIn from './signInContent/HeaderSignIn';
import InputEmail from './signInContent/InputEmail';
import { height, width } from '../../Helpers';
import { Button, Center, Text, View } from 'native-base';
import { Colors } from '../../Colors';
import InputPassword from './signInContent/InputPassword';

const SignInScreen = () => {
  return (
    <SafeAreaView style={style.container}>
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
      <View mt={5} alignItems={'center'}>
        <Text color={Colors.grayText}>Or continue with</Text>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20
  },
  input: {
    marginTop: height * 0.1
  }
});
