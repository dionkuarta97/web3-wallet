import { Button, Center, HStack, Text, VStack, View } from 'native-base';
import DefaultBody from '../../components/DefaultBody';
import { Animated, TextInput } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import { useAtom } from 'jotai';
import { walletReducer } from '../../state/wallet/walletReducer';
import { createWallet } from '../../api/wallet';
import LoadingModal from '../../components/modal/LoadingModal';
import { height, width } from '../../Helpers';
import { Colors } from '../../Colors';
import { bottomReducer } from '../../state/bottom/bottomReducer';
import InputWalletName from './CreateWalletContents/InputWalletName';
import InputWalletAdress from './CreateWalletContents/InputWalletAdress';
import { useFocusEffect } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import DefaultModal from '../../components/modal/DefaultModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { WalletParamList } from '../../navigations/WalletRouter';

const textBody: string[] = [
  'Save your 12 words carefully. Avoid saving them on online storage, mobile phones or andy digital register',
  'You will only need them to restore your account. if you lose it, you can’t access your account anymore',
  'Your seed is only for personal use. Dont share this sequence of words with anyone else',
  'If you Lost this phrase you Lost your wallet'
];

const CreateWalletScreen = () => {
  const [loading, setLoading] = useState(true);
  const [wallet, dispatch] = useAtom(walletReducer);
  const [bottom, disBottom] = useAtom(bottomReducer);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const animatedButton = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<StackNavigationProp<WalletParamList>>();
  const refInput = useRef<TextInput>();
  const interpolate = animatedButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height / 9]
  });
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
            dispatch({ type: 'setNewWallet', payload: val });
          })
          .catch((err) => {
            console.log(err);
          });
        // Finish.
        BackgroundFetch.finish(taskId);
      },
      (taskId: string) => {
        // Oh No!  Our task took too long to complete and the OS has signalled
        // that this task must be finished immediately.
        console.log('[Fetch] TIMEOUT taskId:', taskId);
        BackgroundFetch.finish(taskId);
      }
    );
  };

  useEffect(() => {
    initBackgroundFetch();
    if (!wallet.newWallet) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [wallet.newWallet]);

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: 'setWalletName', payload: '' });
    }, [])
  );

  useEffect(() => {
    if (!keyboardShow) {
      Animated.timing(animatedButton, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(animatedButton, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
      }).start();
    }
  }, [keyboardShow]);

  return (
    <DefaultBody
      tapHandler={() => {
        refInput.current?.blur();
        if (bottom.showWallet) {
          disBottom({ type: 'setShowWallet', payload: false });
        }
      }}
    >
      {loading && <LoadingModal text={'Generate New Wallet'} />}
      {showModal && (
        <DefaultModal
          header={
            <View paddingY={4}>
              <Text fontSize={26} color={'white'}>
                Read carefully
              </Text>
            </View>
          }
          body={
            <VStack marginY={5}>
              {textBody.map((el, idx) => (
                <HStack key={idx} space={3} width={width * 0.7}>
                  <Text color={Colors.grayText}>{idx + 1 + '.'}</Text>
                  <Text color={Colors.grayText}>{el}</Text>
                </HStack>
              ))}
            </VStack>
          }
          footer={
            <View>
              <Button
                _text={{
                  fontWeight: 'semibold'
                }}
                bg={Colors.green}
                _pressed={{
                  bg: Colors.lightGreen
                }}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('PrivateKeyPhraseShowContent');
                }}
                borderRadius={15}
                width={width * 0.5}
              >
                I Agree
              </Button>
            </View>
          }
          tapHandler={() => setShowModal(false)}
        />
      )}
      <View flex={1}>
        <Center>
          <Text fontSize={width / 20} fontWeight={'bold'} color={Colors.green}>
            Create New Wallet
          </Text>
          <View
            style={{
              borderTopWidth: 4,
              width: width / 2.2,
              borderRadius: 15,
              marginTop: 3,
              borderTopColor: Colors.green
            }}
          />
        </Center>
        <View marginTop={height / 14}>
          <Text marginBottom={2} color={Colors.green}>
            Wallet Name
          </Text>
          <InputWalletName
            refInput={refInput}
            onFocused={(val) => {
              setKeyboardShow(val);
            }}
            value={wallet.walletName}
            onChange={(val) => {
              dispatch({ type: 'setWalletName', payload: val });
            }}
          />
        </View>
        <View marginTop={height / 30}>
          <Text marginBottom={2} color={Colors.green}>
            Wallet Addres
          </Text>
          <InputWalletAdress value={wallet.newWallet?.address} />
        </View>
      </View>
      <Animated.View
        style={{
          padding: 15,
          alignItems: 'center',
          transform: [
            {
              translateY: interpolate
            }
          ]
        }}
      >
        <Button
          disabled={wallet.walletName === '' ? true : false}
          borderRadius={15}
          _text={{
            color: wallet.walletName === '' ? 'black' : 'white',
            fontWeight: 'semibold'
          }}
          onPress={() => {
            setShowModal(true);
            refInput.current.blur();
          }}
          _pressed={{ bg: Colors.lightGreen }}
          bg={wallet.walletName === '' ? Colors.neutral50 : Colors.green}
          width={width / 1.5}
        >
          Continue
        </Button>
      </Animated.View>
    </DefaultBody>
  );
};

export default CreateWalletScreen;
