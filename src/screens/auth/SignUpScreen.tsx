import { SafeAreaView, StyleSheet } from 'react-native';

const SignUpScreen = () => {
  return <SafeAreaView style={style.container}></SafeAreaView>;
};

export default SignUpScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20
  }
});
