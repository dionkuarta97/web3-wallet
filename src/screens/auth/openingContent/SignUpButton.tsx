import { Button, Text } from 'native-base';
import { width } from '../../../Helpers';
import { GradientBorderView } from '@good-react-native/gradient-border';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from '../../../navigations/AuthRouter';

const SignUpButton = () => {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();
  return (
    <Button
      borderRadius={12}
      onPress={() => navigation.navigate('SignUpScreen')}
      alignSelf={'center'}
      bg={'rgba(4, 38, 38, 1)'}
      _pressed={{
        bg: 'rgba(4, 38, 38, 0)'
      }}
      width={width * 0.5}
      padding={0}
    >
      <GradientBorderView
        gradientProps={{
          colors: ['rgba(254, 83, 187, 0.75)', 'rgba(9, 251, 211, 0.75)'],
          start: { x: 0.0, y: 0.1 },
          end: { x: 0.1, y: 2.5 }
        }}
        style={{
          borderRadius: 12,
          borderWidth: 1,
          width: width * 0.5,
          alignItems: 'center',
          padding: 8
        }}
      >
        <Text color={'white'} fontWeight={'bold'}>
          Sign Up
        </Text>
      </GradientBorderView>
    </Button>
  );
};

export default SignUpButton;
