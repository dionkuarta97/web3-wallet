import { Button, Center, HStack, Text, VStack, View } from 'native-base';
import DefaultBody from '../../components/DefaultBody';
import { TextInput, TouchableWithoutFeedback } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { walletReducer } from '../../state/wallet/walletReducer';
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
import { BottomTabParamList } from '../../navigations/BottomTabRouter';
import { WebView } from 'react-native-webview';
import { NewWallet } from '../../api/wallet';

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
  const [showModal, setShowModal] = useState(false);
  const [startBackgroundTask, setStartBackgroundTask] = useState(false);

  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();
  const refInput = useRef<TextInput>();

  useEffect(() => {
    if (!wallet.newWallet) {
      setLoading(true);
      setStartBackgroundTask(true);
    } else {
      setLoading(false);
    }
  }, [wallet.newWallet]);

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: 'setWalletName', payload: '' });
    }, [])
  );

  return (
    <DefaultBody>
      <TouchableWithoutFeedback
        onPress={() => {
          refInput.current?.blur();
        }}
      >
        <>
          {loading && <LoadingModal text={'Generate New Wallet'} />}
           {/*
            Generating Wallet on background using WebView
            The script is on https://wallet-generator.arisenetwork.io
          */}
          {startBackgroundTask && (
            <WebView
              source={{uri: 'https://wallet-generator.arisenetwork.io' }}
              onMessage={(event) => {
                console.log("message from webview", {event: JSON.parse(event.nativeEvent.data)});
                const newWallet = JSON.parse(event.nativeEvent.data) as NewWallet;
                dispatch({ type: 'setNewWallet', payload: newWallet });
                setStartBackgroundTask(false);
                setLoading(false);
              }}
            />
          )}
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
                      navigation.navigate('WalletRouter', {
                        screen: 'PrivateKeyPhraseShowScreen'
                      });
                    }}
                    borderRadius={15}
                    width={width * 0.5}
                  >
                    I Agree
                  </Button>
                </View>
              }
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
                onFocused={(val) => {}}
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
            <Center marginTop={height * 0.3}>
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
            </Center>
          </View>
        </>
      </TouchableWithoutFeedback>
    </DefaultBody>
  );
};

export default CreateWalletScreen;
