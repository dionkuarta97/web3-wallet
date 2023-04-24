import { ImageBackground, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Colors } from '../../Colors';
import { height, width } from '../../Helpers';
import { HStack } from 'native-base';
import { useEffect, useRef } from 'react';
import ScrollPage from './onBoardingContent/ScrollPage';
import { useAtom } from 'jotai';
import { firstOpenAtomWithPersistence } from '../../state/auth';

const pages: { title: string; decs: string }[] = [
  {
    title: 'Multichain Non Custodial',
    decs: 'We have implemented a range of measures to maximize security and protect our users digital assets.'
  },
  {
    title: 'Fiat On Ramp',
    decs: 'Top up with conventional payment / Top up with major payment providers'
  },
  {
    title: 'Fiat Of Ramp',
    decs: 'Cash out to major banks, e-money, and even physical or digital payment card'
  },
  {
    title: 'Easy Login',
    decs: 'We offer a range of options to make it easy and convenient for our users to manage their assets, wherever they are.'
  },
  { title: 'NFT Friendly', decs: 'buy, store, sent, reedem your digital assets' },
  {
    title: 'Services and D’apps Store',
    decs: "Pay for everyday services and install your favorite d'apps"
  }
];

const OnBoardingScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [, SetFirstOpen] = useAtom(firstOpenAtomWithPersistence);

  useEffect(() => {
    SetFirstOpen(false);
  }, []);

  return (
    <ImageBackground source={require('../../../assets/background.png')} style={style.container}>
      <Image style={style.img} source={require('../../../assets/arise.png')} />
      <ScrollView
        style={style.scroll}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false
        })}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {pages.map((el, idx) => (
          <ScrollPage
            last={idx === pages.length - 1 ? true : false}
            title={el.title}
            desc={el.decs}
            key={idx}
          />
        ))}
      </ScrollView>
      <HStack style={style.dots} space={2}>
        {pages.map((el, idx) => {
          const widthAnimated = scrollX.interpolate({
            inputRange: [width * (idx - 1), width * idx, width * (idx + 1)],
            outputRange: [10, 20, 10],
            extrapolate: 'clamp'
          });
          const color = scrollX.interpolate({
            inputRange: [width * (idx - 1), width * idx, width * (idx + 1)],
            outputRange: [Colors.neutral50, Colors.white, Colors.neutral50],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={idx}
              style={[style.dot, { width: widthAnimated, backgroundColor: color }]}
            />
          );
        })}
      </HStack>
    </ImageBackground>
  );
};

export default OnBoardingScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: Colors.black
  },
  img: {
    width: width * 0.43,
    height: height * 0.14,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  scroll: {
    paddingHorizontal: 10,
    marginTop: height * 0.3,
    flexGrow: 0,
    height: height * 0.4
  },
  dots: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    alignSelf: 'center',
    height: 10,
    borderRadius: 50
  }
});
