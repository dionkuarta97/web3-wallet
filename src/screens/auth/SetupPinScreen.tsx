import { View, Text, HStack, Center, Button } from 'native-base';
import PinCode from '../../components/pinCode/PinCode';
import { Colors } from '../../Colors';
import { Image } from 'react-native';
import { width } from '../../Helpers';
import { useAtom } from 'jotai';
import { authReducer } from '../../state/auth/authReducer';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from '../../navigations/AuthRouter';

const SetupPinScreen = () => {
  const [auth, dispatch] = useAtom(authReducer);

  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();
  useEffect(() => {
    return () => {
      dispatch({ type: 'setPin', payload: null });
    };
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 20
      }}
      bg={'white'}
      flex={1}
    >
      <View>
        <HStack alignItems={'center'} space={3}>
          <Text fontWeight={'bold'} fontSize={25}>
            Set up PIN Code
          </Text>
          <Image
            source={require('../../../assets/icon/security.png')}
            style={{
              resizeMode: 'contain',
              height: width / 13,
              width: width / 13
            }}
          />
        </HStack>
        <Text color={Colors.grayText}>Enter the PIN code to secure your account</Text>
      </View>
      <PinCode
        onChange={(val) => {
          dispatch({ type: 'setPin', payload: val });
        }}
      />
      <Center mt={width / 15}>
        <Button
          disabled={auth.inputPin?.length === 4 ? false : true}
          borderRadius={12}
          _pressed={{ bg: Colors.lightGreen }}
          bg={auth.inputPin?.length === 4 ? Colors.green : Colors.neutral50}
          width={width / 1.5}
          size={'md'}
          marginTop={1}
          _text={{
            fontWeight: 'semibold',
            color: auth.inputPin?.length === 4 ? 'white' : 'black'
          }}
          onPress={() => {
            navigation.navigate('ReenterPinScreen');
          }}
        >
          Continue
        </Button>
      </Center>
    </View>
  );
};

export default SetupPinScreen;
