import { View } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import FadeInView from './animated/FadeInView';
import { TouchableWithoutFeedback } from 'react-native';

type DefaultAppProps = PropsWithChildren<{
  animasi?: boolean;
  p?: number & {};
  tapBackdor?: () => void;
}>;

const DefaultBody = ({
  tapBackdor = () => {},
  p = 5,
  animasi = true,
  children
}: DefaultAppProps) => {
  return (
    <View paddingX={p} bg={'white'} flex={1}>
      {animasi ? (
        <FadeInView>
          <TouchableWithoutFeedback
            onPress={() => {
              tapBackdor();
            }}
          >
            <View flex={1}>{children}</View>
          </TouchableWithoutFeedback>
        </FadeInView>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            tapBackdor();
          }}
        >
          <View flex={1}>{children}</View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default DefaultBody;
