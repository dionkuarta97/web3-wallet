import { Text, View } from 'native-base';
import { Colors } from '../../Colors';
import { height, width } from '../../Helpers';
import { Image, Pressable } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { AuthParamList } from '../../navigations/AuthRouter';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useState } from 'react';
import { resendEmailVerification } from '../../api/auth';
import { Alert } from 'react-native';
import LoadingModal from '../../components/modal/LoadingModal';

const EmailVerificationScreen = () => {
  const route = useRoute<RouteProp<AuthParamList>>();
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();
  const [loading, setLoading] = useState(false);

  const handleResendEmail = useCallback(async () => {
    try {
      setLoading(true);
      const data = await resendEmailVerification(route.params?.email);
      setLoading(false);
      Alert.alert('success', 'success resend email');
    } catch (error) {
      setLoading(false);
      Alert.alert('error', 'internal server error');
    }
  }, []);

  return (
    <View alignItems={'center'} bg={Colors.green} flex={1}>
      {loading && <LoadingModal />}
      <Text
        textAlign={'center'}
        mt={height / 14}
        fontWeight={'semibold'}
        fontSize={22}
        color={'white'}
      >
        Verify your Account
      </Text>
      <Image
        source={require('../../../assets/verifEmail.png')}
        style={{
          resizeMode: 'contain',
          width: width / 1.3,
          height: height / 6,
          marginTop: height / 10
        }}
      />
      <View px={8} mt={height / 15}>
        <Text color={'#D3D3D3'} textAlign={'center'}>
          We sent a verification email to your address, Please check your inbox or spam, and click
          the link to get started
        </Text>
      </View>
      <Text fontSize={16} mt={height / 15} color={'white'}>
        Did not receive the email?
      </Text>
      <Pressable
        onPress={() => {
          handleResendEmail();
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? Colors.neutral25 : 'white',
            paddingHorizontal: height / 12,
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: height / 25
          }
        ]}
      >
        <Text fontWeight={'bold'}>Resend Verification</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.replace('SignInScreen');
        }}
        style={({ pressed }) => [
          {
            marginTop: 13,
            borderBottomWidth: 1,
            borderBottomColor: pressed ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)'
          }
        ]}
      >
        <Text color={'white'} fontWeight={'semibold'}>
          Login Now
        </Text>
      </Pressable>
    </View>
  );
};

export default EmailVerificationScreen;
