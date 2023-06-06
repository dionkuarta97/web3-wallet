import { Text, View } from 'native-base';
import { Colors } from '../../../Colors';

const HeaderSignUp = () => {
  return (
    <View>
      <Text fontWeight={'bold'} fontSize={25}>
        Sign Up
      </Text>
      <Text color={Colors.grayText}>Enter your details to create your Arise account</Text>
    </View>
  );
};

export default HeaderSignUp;
