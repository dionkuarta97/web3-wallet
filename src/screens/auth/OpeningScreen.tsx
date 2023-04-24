import { ImageBackground, StyleSheet, Image } from 'react-native';
import { Colors } from '../../Colors';
import { height, width } from '../../Helpers';
import { View, Text, VStack } from 'native-base';
import SignButton from './openingContent/SignInButton';
import SignUpButton from './openingContent/SignUpButton';

const OpeningScreen = () => {
  return (
    <ImageBackground source={require('../../../assets/background.png')} style={style.container}>
      <Image style={style.img} source={require('../../../assets/arise.png')} />
      <View style={style.content}>
        <View>
          <Text width={width * 0.7} fontSize={35} fontWeight={'bold'} color={Colors.grayText085}>
            Explore Web 3.0 Made Easy
          </Text>
        </View>
        <View mt={5} width={width * 0.7}>
          <Text color={Colors.grayText075}>Safe, Secure & Simple Wallet</Text>
        </View>
      </View>
      <VStack style={style.button} space={2}>
        <SignButton />
        <SignUpButton />
      </VStack>
    </ImageBackground>
  );
};

export default OpeningScreen;

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
  content: {
    marginTop: height * 0.15,
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    marginTop: height * 0.13
  }
});
