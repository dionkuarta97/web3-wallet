import { Center, Text, View } from 'native-base';
import { Colors } from '../../../Colors';
import { Image, Pressable } from 'react-native';
import { height, width } from '../../../Helpers';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../navigations/Root';

const SuccessReset = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  return (
    <View flex={1} p={5} bg={Colors.green}>
      <Center flex={1}>
        <Image
          source={require('../../../../assets/success-reset.png')}
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
          New password confirmed successful
        </Text>
        <Text width={width / 1.3} textAlign={'center'} color={Colors.grayText}>
          Securing your account is important to protect your personal and sensitive information from
          unauthorized access, which can lead to identity theft, financial loss, or other serious
          consequences
        </Text>
      </Center>
      <Pressable
        onPress={() => {
          navigation.navigate('OpeningRouter', { screen: 'SplashScreen' });
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
        <Text fontWeight={'bold'}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SuccessReset;
