import { Actionsheet, Button, HStack, Heading } from 'native-base';
import { Dimensions, Image } from 'react-native';
import { Colors } from '../../Colors';
import { CommonActions, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '../../navigations/BottomTabRouter';

const SendMenuBottomSheet = ({ onClose, isOpen }: { onClose: () => void; isOpen: boolean }) => {
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();
  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <Actionsheet.Content>
        <Heading my={8}>Send To</Heading>

        <HStack space={4} mb={5}>
          <Button
            bg={Colors.green}
            _pressed={{
              bg: Colors.lightGreen
            }}
            leftIcon={
              <Image
                style={{
                  width: 25,
                  height: 25
                }}
                source={require('../../../assets/icon/walletGray.png')}
                resizeMode="contain"
              />
            }
            onPress={() => {
              onClose();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'ActionRouter', params: { screen: 'SendActionScreen' } }]
                })
              );
            }}
            width={Dimensions.get('screen').width / 2.4}
          >
            Wallet Address
          </Button>
          <Button
            bg={'white'}
            borderColor={'black'}
            borderWidth={1}
            onPress={() => {
              onClose();
            }}
            _pressed={{
              bg: Colors.neutral25
            }}
            _text={{
              color: 'black'
            }}
            leftIcon={
              <Image
                style={{
                  width: 25,
                  height: 25
                }}
                source={require('../../../assets/side-icons/moneys.png')}
                resizeMode="contain"
              />
            }
            width={Dimensions.get('screen').width / 2.4}
          >
            Flat Account
          </Button>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SendMenuBottomSheet;
