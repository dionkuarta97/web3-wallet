import { SafeAreaView, StyleSheet } from 'react-native';
import HeaderSignUp from './signupContent/HeaderSignUp';
import SignUpContent from './signupContent/SignUpContent';

const SignUpScreen = () => {
  return (
    <SafeAreaView style={style.container}>
      <HeaderSignUp />
      <SignUpContent />
    </SafeAreaView>
  );
};

export default SignUpScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20
  }
});
