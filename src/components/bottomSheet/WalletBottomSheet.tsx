import React from 'react';
import { Actionsheet, Button, HStack, Heading, Text } from 'native-base';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { Colors } from '../../Colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAtom } from 'jotai';
import { bottomReducer } from '../../state/bottom/bottomReducer';
import BackgroundFetch from 'react-native-background-fetch';
import { walletReducer } from '../../state/wallet/walletReducer';
import { createWallet } from '../../api/wallet';
import { BottomTabParamList } from '../../navigations/BottomTabRouter';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const WalletBottomSheet = ({ onClose = () => {}, isOpen = false }: Props) => {
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();
  const [, dispatch] = useAtom(bottomReducer);
  const [wallet, disWallet] = useAtom(walletReducer);
  const initBackgroundFetch = async () => {
    const status: number = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        stopOnTerminate: false,
        enableHeadless: true,
        startOnBoot: true,
        // Android options
        forceAlarmManager: true, // <-- Set true to bypass JobScheduler.
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false // Default
      },
      async (taskId: string) => {
        console.log('[BackgroundFetch] taskId', taskId);
        // Create an Event record.
        createWallet()
          .then((val) => {
            disWallet({ type: 'setNewWallet', payload: val });
          })
          .catch((err) => {
            console.log(err);
          });
        BackgroundFetch.finish(taskId);
        BackgroundFetch.stop(taskId);
      },
      (taskId: string) => {
        // Oh No!  Our task took too long to complete and the OS has signalled
        // that this task must be finished immediately.
        console.log('[Fetch] TIMEOUT taskId:', taskId);
        BackgroundFetch.finish(taskId);
      }
    );
  };
  const scheduleTask = () => {
    BackgroundFetch.scheduleTask({
      taskId: 'com.arise',
      delay: 0,
      periodic: true,
      forceAlarmManager: true
    })
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <Actionsheet.Content>
        <Heading>Connect Wallet</Heading>
        <Text mb={4} mt={2}>
          Please choose one for your wallet
        </Text>
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
                source={require('../../../assets/icon/empty-wallet-add.png')}
                resizeMode="contain"
              />
            }
            onPress={() => {
              onClose();
              dispatch({ type: 'setTabActive', payload: 'ConnectScreen' });
              dispatch({ type: 'setShowWallet', payload: false });
              if (!wallet.newWallet) {
                initBackgroundFetch();
                scheduleTask();
              }

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'WalletRouter', params: { screen: 'CreateWalletScreen' } }]
                })
              );
            }}
            width={Dimensions.get('screen').width / 2.4}
          >
            New Wallet
          </Button>
          <Button
            bg={'white'}
            borderColor={'black'}
            borderWidth={1}
            onPress={() => {
              dispatch({ type: 'setShowWallet', payload: false });
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'WalletRouter', params: { screen: 'ImportWalletScreen' } }]
                })
              );

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
                source={require('../../../assets/icon/wallet-search.png')}
                resizeMode="contain"
              />
            }
            width={Dimensions.get('screen').width / 2.4}
          >
            Import Wallet
          </Button>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default WalletBottomSheet;
