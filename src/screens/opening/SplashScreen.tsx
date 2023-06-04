import { Image, ImageBackground, StyleSheet } from 'react-native';
import { width } from '../../Helpers';
import { Colors } from '../../Colors';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../navigations/Root';
import { authReducer } from '../../state/auth/authReducer';
import { MORALIS_API_KEY } from '@env';
const Moralis = require('moralis').default;

const SplashScreen = () => {
  const [auth] = useAtom(authReducer);
  const connectMoralis = async () => {
    await Moralis.start({
      apiKey: MORALIS_API_KEY
    });
  };

  console.log(MORALIS_API_KEY);

  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const init = () => {
    setTimeout(() => {
      if (!auth?.isLogin) {
        if (auth?.firstOpen) {
          navigation.replace('OpeningRouter', { screen: 'OnBoardingScreen' });
        } else {
          navigation.replace('AuthRouter', { screen: 'OpeningScreen' });
        }
      } else {
        navigation.replace('BottomTabRouter', {
          screen: 'HomeRouter',
          params: {
            screen: 'HomeScreen'
          }
        });
      }
    }, 2000);
  };

  useEffect(() => {
    connectMoralis();
    init();
  }, []);

  return (
    <ImageBackground style={style.container} source={require('../../../assets/background.png')}>
      <Image style={style.logo} source={require('../../../assets/arise.png')} />
    </ImageBackground>
  );
};

export default SplashScreen;

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: Colors.black
  },
  logo: {
    width: width * 0.6,
    resizeMode: 'contain'
  }
});
