import * as React from 'react';
import { Animated, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

type Props = React.PropsWithChildren<{}>;

const FadeInView = ({ children }: Props) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useFocusEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: -Dimensions.get('screen').width,
      duration: 250,
      useNativeDriver: true
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start();
    };
  });

  return (
    <Animated.View
      style={{
        backgroundColor: 'white',
        flex: 1,
        left: Dimensions.get('screen').width,
        transform: [{ translateX: fadeAnim }]
      }}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;
