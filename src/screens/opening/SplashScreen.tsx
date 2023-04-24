import { Image, ImageBackground, StyleSheet } from 'react-native';
import { width } from '../../Helpers';
import { Colors } from '../../Colors';
import { useAtom } from 'jotai';
import { firstOpenAtomWithPersistence, isLoginAtomWithPersistence } from '../../state/auth';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../navigations/Root';

const SplashScreen = () => {
  const [isLogin] = useAtom(isLoginAtomWithPersistence);
  const [firstOpen] = useAtom(firstOpenAtomWithPersistence);

  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const init = () => {
    setTimeout(() => {
      if (!isLogin) {
        if (firstOpen) {
          navigation.replace('OpeningRouter', { screen: 'OnBoardingScreen' });
        } else {
          navigation.replace('AuthRouter', { screen: 'OpeningScreen' });
        }
      }
    }, 2000);
  };

  useEffect(() => {
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
