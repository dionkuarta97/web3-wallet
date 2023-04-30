import { View, Text, HStack, Center, Button } from 'native-base';
import PinCode from '../../components/pinCode/PinCode';
import { Colors } from '../../Colors';
import { Image } from 'react-native';
import { width } from '../../Helpers';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { authReducer } from '../../state/auth/authReducer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../navigations/Root';

const ReenterPinScreen = () => {
  const [error, setError] = useState<string | null>(null);
  const [auth, dispatch] = useAtom(authReducer);
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  useEffect(() => {
    return () => {
      dispatch({ type: 'setRePin', payload: null });
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
            Re- Enter PIN Code
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
        <Text color={Colors.grayText}>Re - Enter the PIN code to secure your account</Text>
      </View>
      <PinCode
        error={error}
        onDel={() => {
          if (error) {
            setError(null);
          }
        }}
        onChange={(val) => {
          dispatch({ type: 'setRePin', payload: val });
        }}
      />
      <Center mt={width / 15}>
        <Button
          borderRadius={12}
          disabled={auth.inputRepin?.length === 4 ? false : true}
          _pressed={{ bg: Colors.lightGreen }}
          bg={auth.inputRepin?.length === 4 ? Colors.green : Colors.neutral50}
          width={width / 1.5}
          size={'md'}
          marginTop={1}
          _text={{
            fontWeight: 'semibold',
            color: auth.inputRepin?.length === 4 ? 'white' : 'black'
          }}
          onPress={() => {
            if (Number(auth.inputPin?.join('')) !== Number(auth.inputRepin?.join(''))) {
              setError('Pin Code are not the same');
            } else {
              dispatch({
                type: 'setUserInfo',
                payload: { ...auth.userInfo, pin: Number(auth.inputPin?.join('')) }
              });
              dispatch({ type: 'setPin', payload: [] });
              dispatch({ type: 'setRePin', payload: [] });
              dispatch({ type: 'setIsLogin', payload: true });
              navigation.replace('BottomTabRouter', {
                screen: 'HomeRouter',
                params: {
                  screen: 'HomeScreen'
                }
              });
            }
          }}
        >
          Continue
        </Button>
      </Center>
    </View>
  );
};

export default ReenterPinScreen;
