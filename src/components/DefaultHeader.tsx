import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pressable, View } from 'native-base';
import { StyleSheet, Image, StatusBar } from 'react-native';
import { RootParamList } from '../navigations/Root';
import { width } from '../Helpers';

const DefaultHeader = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  return (
    <View padding={5} bg={'white'}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <Pressable
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
        alignSelf="flex-start"
      >
        {({ isPressed }) => {
          return (
            <View
              style={{
                opacity: isPressed ? 0.7 : 1,
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1
                  }
                ]
              }}
            >
              <Image style={style.image} source={require('../../assets/icon/arrowBack.png')} />
            </View>
          );
        }}
      </Pressable>
    </View>
  );
};

export default DefaultHeader;

const style = StyleSheet.create({
  image: {
    width: width / 10,
    height: width / 10
  }
});
