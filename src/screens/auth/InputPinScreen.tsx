import { View, Text, HStack, Center, Button } from 'native-base';
import PinCode from '../../components/pinCode/PinCode';
import { Colors } from '../../Colors';
import { Image } from 'react-native';
import { width } from '../../Helpers';
import { useAtom } from 'jotai';
import { authReducer } from '../../state/auth/authReducer';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../navigations/Root';
import { AuthRouteProps } from '../../navigations/AuthRouter';

const InputPinScreen = () => {
  const [auth, dispatch] = useAtom(authReducer);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const route = useRoute<AuthRouteProps<'InputPinScreen'>>();
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
            Input your PIN Code
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
        error={error}
        onDel={() => {
          if (error) {
            setError(null);
          }
        }}
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
            if (auth.userInfo.pin !== Number(auth.inputPin.join(''))) {
              setError('Wrong Pin');
            } else {
              if (route.params.data) {
                navigation.navigate('BottomTabRouter', {
                  screen: 'WalletRouter',
                  params: {
                    screen: 'WalletAmountScreen',
                    params: { data: { ...route.params.data, valid: true } }
                  }
                });
              } else {
                dispatch({ type: 'setIsLogin', payload: true });
                navigation.replace('BottomTabRouter', {
                  screen: 'HomeRouter',
                  params: {
                    screen: 'HomeScreen'
                  }
                });
              }
            }
          }}
        >
          Continue
        </Button>
        <Button
          colorScheme={'gray'}
          padding={1}
          variant={'link'}
          mt={2}
          size="sm"
          _text={{
            color: 'gray',
            fontSize: 12,
            fontWeight: 'semibold'
          }}
        >
          Forgot Pin?
        </Button>
      </Center>
    </View>
  );
};

export default InputPinScreen;
