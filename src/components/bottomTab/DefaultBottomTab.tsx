import { Text, View } from 'native-base';
import React from 'react';
import { ImageSourcePropType, TouchableOpacity, Image } from 'react-native';
import { Animated } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { width } from '../../Helpers';
import { Colors } from '../../Colors';
import { useAtom } from 'jotai';
import { bottomReducer } from '../../state/bottom/bottomReducer';
import { RootParamList } from '../../navigations/Root';

const DefaultBottomTab = (
  props: BottomTabBarButtonProps & {
    label: string;
    image: ImageSourcePropType;
    router: any;
    screen?: any;
  }
) => {
  const [bottom, dispatch] = useAtom(bottomReducer);
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  const isFocused: boolean = props.accessibilityState.selected;

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
      }}
      activeOpacity={1}
      onPress={() => {
        dispatch({ type: 'setShowWallet', payload: false });
        if (props.screen) {
          navigation.navigate('BottomTabRouter', {
            screen: props.router,
            params: { screen: props.screen }
          });
        } else {
          navigation.navigate('BottomTabRouter', { screen: props.router });
        }
      }}
    >
      <Animated.View
        style={{
          elevation: 3
        }}
      >
        <Image
          source={props.image}
          style={{
            width: width / 15,
            height: width / 15,
            resizeMode: 'contain',
            transform: [{ scale: isFocused ? 1.1 : 1 }]
          }}
        />
      </Animated.View>
      <Text fontSize={13}>{props.label}</Text>
      <View
        style={{
          marginTop: 5,
          borderRadius: 100,
          borderTopWidth: 3,
          borderColor: isFocused ? Colors.green : 'white',
          width: width / 15
        }}
      />
    </TouchableOpacity>
  );
};

export default DefaultBottomTab;
