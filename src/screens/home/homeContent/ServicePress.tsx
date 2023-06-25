import { Pressable, View, Text } from 'native-base';
import React from 'react';
import { Dimensions, Image, ImageSourcePropType } from 'react-native';
import { Colors } from '../../../Colors';

type Props = {
  name: string & {};
  logo: ImageSourcePropType;
};

const ServicePress = ({ name, logo }: Props) => {
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
              width: 30,
              height: 30,
              marginBottom: 2,
              alignSelf: 'center'
            }}
            source={logo}
          />
          <Text numberOfLines={1} fontSize={12} alignSelf={'center'} color={Colors.green}>
            {name}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default ServicePress;
