import { Actionsheet, Button, HStack, Heading, Text, View, useDisclose } from 'native-base';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { Colors } from '../../Colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '../../navigations/BottomTabRouter';
import SendMenuBottomSheet from './SendMenuBottomSheet';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const ActionBottomSheet = ({ onClose = () => {}, isOpen = false }: Props) => {
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();
  const sendMenu = useDisclose();

  return (
    <>
      <SendMenuBottomSheet isOpen={sendMenu.isOpen} onClose={sendMenu.onClose} />
      <Actionsheet
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      >
        <Actionsheet.Content>
          <Heading my={8}>Action</Heading>
          <HStack space={4} mb={5}>
            <Button
              bg={Colors.green}
              _pressed={{
                bg: Colors.lightGreen
              }}
              borderRadius={15}
              width={'20%'}
              onPress={() => {
                onClose();
                // sendMenu.onOpen();
              }}
            >
              <View alignItems={'center'}>
                <Image
                  style={{
                    width: 25,
                    height: 25
                  }}
                  source={require('../../../assets/icon/empty-wallet-add.png')}
                  resizeMode="contain"
                />
                <Text fontSize={12} color={'white'}>
                  Send
                </Text>
              </View>
            </Button>
            <Button
              bg={Colors.green}
              _pressed={{
                bg: Colors.lightGreen
              }}
              borderRadius={15}
              width={'20%'}
              onPress={() => {}}
            >
              <View alignItems={'center'}>
                <Image
                  style={{
                    width: 25,
                    height: 25
                  }}
                  source={require('../../../assets/icon/receive.png')}
                  resizeMode="contain"
                />
                <Text fontSize={12} color={'white'}>
                  Receive
                </Text>
              </View>
            </Button>
            <Button
              bg={Colors.green}
              _pressed={{
                bg: Colors.lightGreen
              }}
              borderRadius={15}
              width={'20%'}
              onPress={() => {}}
            >
              <View alignItems={'center'}>
                <Image
                  style={{
                    width: 25,
                    height: 25
                  }}
                  source={require('../../../assets/icon/pay.png')}
                  resizeMode="contain"
                />
                <Text fontSize={12} color={'white'}>
                  Pay
                </Text>
              </View>
            </Button>
            <Button
              bg={Colors.green}
              _pressed={{
                bg: Colors.lightGreen
              }}
              borderRadius={15}
              width={'20%'}
              onPress={() => {}}
            >
              <View alignItems={'center'}>
                <Image
                  style={{
                    width: 25,
                    height: 25
                  }}
                  source={require('../../../assets/icon/swap.png')}
                  resizeMode="contain"
                />
                <Text fontSize={12} color={'white'}>
                  Swap
                </Text>
              </View>
            </Button>
          </HStack>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default ActionBottomSheet;
