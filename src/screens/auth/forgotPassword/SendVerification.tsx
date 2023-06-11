import { Center, Text, View } from 'native-base';
import { Colors } from '../../../Colors';
import { Image, Pressable } from 'react-native';
import { height, width } from '../../../Helpers';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from '../../../navigations/AuthRouter';

const SendVerification = () => {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();
  return (
    <View flex={1} p={5} bg={Colors.green}>
      <Center flex={1}>
        <Image
          source={require('../../../../assets/forget-password.png')}
          style={{
            resizeMode: 'contain',
            width: width / 1.2,
            height: height / 3
          }}
        />
        <Text
          width={width / 1.3}
          my={3}
          color={'white'}
          fontWeight={'bold'}
          fontSize={22}
          textAlign={'center'}
        >
          Verification Code has been sent
        </Text>
        <Text width={width / 1.3} textAlign={'center'} color={Colors.grayText}>
          Verification code has been sent to your email address
        </Text>
      </Center>
      <Pressable
        onPress={() => {
          navigation.navigate('OtpScreen');
        }}
        style={({ pressed }) => [
          {
            alignSelf: 'center',
            marginVertical: height / 40,
            paddingHorizontal: width / 5,
            borderRadius: 10,
            paddingVertical: 10,
            backgroundColor: pressed ? Colors.lightGray : 'white'
          }
        ]}
      >
        <Text fontWeight={'bold'}>Continue</Text>
      </Pressable>
    </View>
  );
};

export default SendVerification;
