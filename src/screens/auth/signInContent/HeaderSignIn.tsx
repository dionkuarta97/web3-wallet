import { Text, View } from 'native-base';
import { Colors } from '../../../Colors';

const HeaderSignIn = () => {
  return (
    <View>
      <Text fontWeight={'bold'} fontSize={25}>
        Login
      </Text>
      <Text color={Colors.grayText}>Welcome back you’ve been missed!</Text>
    </View>
  );
};

export default HeaderSignIn;
