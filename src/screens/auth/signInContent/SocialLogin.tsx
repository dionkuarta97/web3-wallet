import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { Colors } from '../../../Colors';
import { Pressable, View } from 'native-base';
import { width } from '../../../Helpers';

type Props = {
  image: ImageSourcePropType;
  onPress: () => void;
};

const SocialLogin = ({ image, onPress = () => {} }: Props) => {
  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => {
        return (
          <View
            style={[
              style.socialButton,
              {
                opacity: isPressed ? 0.9 : 1,
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1
                  }
                ]
              }
            ]}
          >
            <Image style={style.image} source={image} />
          </View>
        );
      }}
    </Pressable>
  );
};

export default SocialLogin;

const style = StyleSheet.create({
  socialButton: {
    borderWidth: 0.5,
    padding: 5,
    borderColor: Colors.grayText,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: width / 9,
    width: width / 9,
    resizeMode: 'contain'
  }
});
