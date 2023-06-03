import { Pressable, View } from 'native-base';
import React from 'react';
import { StyleSheet, Image, StatusBar } from 'react-native';
import list from '../../assets/icon/list.png';
import global from '../../assets/icon/global.png';
import search from '../../assets/icon/search.png';
import notif from '../../assets/icon/notif.png';
import { ImageSourcePropType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomHeader = () => {
  const insets = useSafeAreaInsets();

  const renderView = (img: ImageSourcePropType, isPressed: boolean) => {
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
        <Image style={style.image} source={img} />
      </View>
    );
  };

  return (
    <View alignItems={'center'} paddingTop={insets.top} padding={5} bg={'white'} flexDirection={'row'}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View style={style.right}>
        <Pressable alignSelf="flex-start" onPress={() => {}}>
          {({ isPressed }) => {
            return renderView(list, isPressed);
          }}
        </Pressable>
        <Pressable alignSelf="flex-start" ml={2} onPress={() => {}}>
          {({ isPressed }) => {
            return renderView(global, isPressed);
          }}
        </Pressable>
      </View>
      <View style={style.left}>
        <Pressable alignSelf="flex-start" onPress={() => {}}>
          {({ isPressed }) => {
            return renderView(search, isPressed);
          }}
        </Pressable>
        <Pressable alignSelf="flex-start" ml={2} onPress={() => {}}>
          {({ isPressed }) => {
            return renderView(notif, isPressed);
          }}
        </Pressable>
      </View>
    </View>
  );
};

export default CustomHeader;

const style = StyleSheet.create({
  right: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto'
  },
  left: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#B4BEBE',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 31,
    height: 31
  }
});
