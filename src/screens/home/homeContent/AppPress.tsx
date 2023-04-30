import { Pressable, View } from 'native-base';
import React from 'react';
import { Dimensions, Image, ImageSourcePropType } from 'react-native';
import { Colors } from '../../../Colors';

type Props = {
  logo: ImageSourcePropType;
};

const AppPress = ({ logo }: Props) => {
  return (
    <Pressable>
      {({ isPressed }) => (
        <View
          style={{
            padding: 8,
            backgroundColor: isPressed ? Colors.lightGray : 'white',
            transform: [
              {
                scale: isPressed ? 0.96 : 1
              }
            ],
            borderRadius: 8,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: -10 },
            elevation: 4,
            width: Dimensions.get('screen').width * 0.17
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              alignSelf: 'center'
            }}
            source={logo}
          />
        </View>
      )}
    </Pressable>
  );
};

export default AppPress;
