import { Text, useDisclose } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, ImageSourcePropType, Image, View } from 'react-native';
import { Animated } from 'react-native';
import { Colors } from '../../Colors';
import { useAtom } from 'jotai';
import { bottomReducer } from '../../state/bottom/bottomReducer';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { height, width } from '../../Helpers';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import WalletBottomSheet from '../bottomSheet/WalletBottomSheet';
import { BottomTabParamList } from '../../navigations/BottomTabRouter';

type menu = {
  screen: any;
  label: string;
  image: ImageSourcePropType;
};

const WalletBottomTab = (
  props: BottomTabBarButtonProps & {
    menus: menu[];
    label: string;
    image: ImageSourcePropType;
  }
) => {
  const { isOpen, onClose, onOpen } = useDisclose();
  const [bottom, dispatch] = useAtom(bottomReducer);
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();

  const isFocused: boolean = props.accessibilityState.selected;

  const scaleAnimated = useRef(new Animated.Value(0)).current;
  const bottomAnimated = useRef(new Animated.Value(0)).current;
  const widthAnimated = useRef(new Animated.Value(0)).current;
  const opacityAnimated = useRef(new Animated.Value(0)).current;
  const animasi = (ref: any, val: number, time: number) => {
    Animated.timing(ref, {
      toValue: val,
      duration: time,
      useNativeDriver: true
    }).start();
  };

  const interpolateBottom = bottomAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height / 13]
  });
  const interpolateWidth = widthAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const interpolateOpacity = opacityAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  useEffect(() => {
    if (!isFocused) {
      animasi(scaleAnimated, 0, 250);
      animasi(widthAnimated, 0, 250);
      animasi(bottomAnimated, 0, 250);
    } else {
      animasi(bottomAnimated, 1, 250);
      animasi(widthAnimated, 1, 250);
      animasi(scaleAnimated, 1, 250);
    }
  }, [isFocused]);

  useEffect(() => {
    if (!bottom.showWallet && !isFocused) {
      animasi(scaleAnimated, 0, 250);
    } else {
      animasi(scaleAnimated, 1, 250);
    }
    if (!bottom.showWallet) {
      animasi(widthAnimated, 0, 250);
      animasi(opacityAnimated, 0, 500);
      animasi(bottomAnimated, 0, 250);
    } else {
      animasi(bottomAnimated, 1, 250);
      animasi(widthAnimated, 1, 250);
      animasi(opacityAnimated, 1, 500);
    }
  }, [bottom.showWallet]);

  return (
    <>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          zIndex: 10
        }}
        activeOpacity={1}
        onPress={() => {
          if (bottom.showWallet) {
            dispatch({ type: 'setShowWallet', payload: false });
          } else {
            dispatch({ type: 'setShowWallet', payload: true });
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
      {bottom.showWallet && (
        <Animated.View
          style={{
            flex: 1,
            position: 'absolute',
            flexDirection: 'row',
            opacity: interpolateOpacity,
            left: width / 9.6,
            width: props.menus.length > 0 ? width / (5.2 / props.menus.length) : width / (5.2 / 1),
            transform: [{ translateY: interpolateBottom }, { scaleX: interpolateWidth }]
          }}
        >
          {props.menus.map((el: menu, idx: number) => (
            <TouchableOpacity
              disabled={!bottom.showWallet ? true : false}
              key={el.screen}
              activeOpacity={1}
              style={{
                flex: 1,
                borderTopLeftRadius: idx === 0 ? 10 : 0,
                borderBottomLeftRadius: idx === 0 ? 10 : 0,
                borderTopRightRadius: idx + 1 === props.menus.length ? 10 : 0,
                borderBottomRightRadius: idx + 1 === props.menus.length ? 10 : 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.green,
                paddingVertical: 5
              }}
              onPress={() => {
                if (el.screen === 'AllWalletScreen') {
                  dispatch({ type: 'setTabActive', payload: el.screen });
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'WalletRouter', params: { screen: 'AllWalletScreen' } }]
                    })
                  );
                } else {
                  onOpen();
                }
                dispatch({ type: 'setShowWallet', payload: false });
              }}
            >
              <Image
                source={el.image}
                style={{
                  width: width / 15,
                  height: width / 15,
                  resizeMode: 'contain',
                  transform: [{ scale: isFocused ? 1.1 : 1 }]
                }}
              />
              <Text fontSize={12} color={'white'}>
                {el.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}

      <WalletBottomSheet isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default WalletBottomTab;
