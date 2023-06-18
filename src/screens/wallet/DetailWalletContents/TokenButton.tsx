import { Text, View } from 'native-base';
import { Image, ImageSourcePropType, Pressable } from 'react-native';
import { Colors } from '../../../Colors';
import { width } from '../../../Helpers';
import React from 'react';

type Props = {
  name: string & {};
  tes?: string & {};
  icon: ImageSourcePropType;
  onPress: () => void;
};

const TokenButton = ({ onPress, name, tes, icon }: Props) => {
  return (
    <Pressable
      onPress={() => {
        onPress();
      }}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.98 : 1 }],
          backgroundColor: pressed ? Colors.lightGreen : Colors.green,
          width: '30%',
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
          justifyContent: 'center',
          height: '85%'
        }
      ]}
    >
      <View>
        <Image
          source={icon}
          style={{
            resizeMode: 'contain',
            width: 25,
            height: 25,
            alignSelf: 'center'
          }}
        />
        <Text fontSize={12} fontWeight={'semibold'} color={'white'}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

export default React.memo(TokenButton);
