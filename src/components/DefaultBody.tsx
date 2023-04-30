import { View } from 'native-base';
import React, { PropsWithChildren } from 'react';

import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import FadeInView from './animated/FadeInView';

type DefaultAppProps = PropsWithChildren<{
  tapHandler?: () => void;
  animasi?: boolean;
  p?: number & {};
}>;

const DefaultBody = ({
  p = 5,
  animasi = true,
  children,
  tapHandler = () => {}
}: DefaultAppProps) => {
  const tap = Gesture.Tap().onStart(() => {
    tapHandler();
  });

  return (
    <View paddingX={p} bg={'white'} flex={1}>
      <GestureDetector gesture={tap}>
        {animasi ? (
          <FadeInView>
            <View flex={1}>{children}</View>
          </FadeInView>
        ) : (
          <View flex={1}>{children}</View>
        )}
      </GestureDetector>
    </View>
  );
};

export default DefaultBody;
