import { Button } from 'native-base';
import { width } from '../../../Helpers';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from '../../../navigations/AuthRouter';

const SignButton = () => {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();
  return (
    <Button
      onPress={() => navigation.navigate('SignInScreen')}
      bg={`rgba(255, 255, 255, 0)`}
      width={width * 0.5}
      _pressed={{
        bg: 'rgba(4, 38, 38, 1)'
      }}
      style={{
        padding: 8
      }}
      _text={{
        fontWeight: 'bold'
      }}
      borderRadius={12}
    >
      Sign In
    </Button>
  );
};

export default SignButton;
