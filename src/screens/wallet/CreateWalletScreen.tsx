import { Button, Center, HStack, Text, VStack, View } from 'native-base';
import DefaultBody from '../../components/DefaultBody';
import { Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { walletReducer } from '../../state/wallet/walletReducer';
import LoadingModal from '../../components/modal/LoadingModal';
import { height, width } from '../../Helpers';
import { Colors } from '../../Colors';
import { bottomReducer } from '../../state/bottom/bottomReducer';
import InputWalletName from './CreateWalletContents/InputWalletName';
import InputWalletAdress from './CreateWalletContents/InputWalletAdress';
import { CommonActions, useFocusEffect } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import DefaultModal from '../../components/modal/DefaultModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '../../navigations/BottomTabRouter';
import { WebView } from 'react-native-webview';
import { NewWallet, detectBalance } from '../../api/wallet';
import { ARISE_WALLET_GENERATOR_BASE_URL } from '@env';
import { NetworkType, SaveWalletPayload, getOrSaveWallet } from '../../api/wallet/save-wallet';
import { authReducer } from '../../state/auth/authReducer';

const textBody: string[] = [
  'Save your 12 words carefully. Avoid saving them on online storage, mobile phones or andy digital register',
  'You will only need them to restore your account. if you lose it, you can’t access your account anymore',
  'Your seed is only for personal use. Dont share this sequence of words with anyone else',
  'If you Lost this phrase you Lost your wallet'
];

const CreateWalletScreen = () => {
  const [loading, setLoading] = useState(false);
  const [wallet, dispatch] = useAtom(walletReducer);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [startBackgroundTask, setStartBackgroundTask] = useState(false);
  const [auth, setAuth] = useAtom(authReducer);
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();
  const refInput = useRef<TextInput>();

  const handleSaveWallet = async (
    walletName: string,
    walletAddress: string,
    walletIndex: number
  ) => {
    const payload: SaveWalletPayload = {
      name: walletName,
      address: walletAddress,
      hd_wallet_index: walletIndex,
      network_type: NetworkType.EVM,
      user_uuid: auth.userInfo.ariseUserUuid
    };
    await getOrSaveWallet(payload);
  };

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
          {startBackgroundTask && wallet.ariseWallet && (
            <WebView
              source={{ uri: ARISE_WALLET_GENERATOR_BASE_URL + '/hd-wallet' }}
              injectedJavaScriptBeforeContentLoaded={`(function() {
                window.privateKey = "${wallet.ariseWallet.walletPrivateKey}"
                window.walletIndex = ${wallet.wallets.length - 1}
              })();`}
              onMessage={async (event) => {
                console.log('message from webview', { event: JSON.parse(event.nativeEvent.data) });
                const newWallets = JSON.parse(event.nativeEvent.data) as NewWallet[];
                if (newWallets.length === 0) {
                  // TODO: error handling
                  setStartBackgroundTask(false);
                  setLoading(false);
                  return;
                }
                dispatch({
                  type: 'setNewWallet',
                  payload: { ...newWallets[0], mnemonic: 'arise' }
                });
                // TODO: hit backend to save new wallet
                // try {
                //   const walletIndex = wallet.wallets.length - 1;
                //   const walletAddress = newWallets[0].address;
                //   await handleSaveWallet(walletAddress, walletIndex);
                // } catch (err) {
                //   console.log({ err });
                // }
                setStartBackgroundTask(false);
                setLoading(false);
              }}
              onError={(event) => {
                // TODO: Error handling
                console.log('error from webview', { event });
              }}
            />
          )}
          {showModal && (
            <DefaultModal
              header={
                <View>
                  <Image
                    source={require('../../../assets/firework.png')}
                    style={{
                      height: height * 0.2,
                      resizeMode: 'contain'
                    }}
                  />
                </View>
              }
              body={
                <View alignItems={'center'} mt={5}>
                  <Text fontWeight={'bold'} fontSize={25}>
                    Congratulation
                  </Text>
                  <Text color={Colors.grayText} mt={5}>
                    Your Wallet has been Created.
                  </Text>
                </View>
              }
              footer={
                <Button
                  width={width * 0.5}
                  borderRadius={15}
                  bg={Colors.green}
                  _pressed={{ bg: Colors.lightGreen }}
                  onPress={() => {
                    setShowModal(false);
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'WalletRouter',
                            params: { screen: 'AllWalletScreen', params: { new: true } }
                          }
                        ]
                      })
                    );
                  }}
                >
                  Done
                </Button>
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
                Wallet Address
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
                onPress={async () => {
                  refInput.current.blur();

                  if (
                    wallet.wallets.filter(
                      (value: { walletName: string }) =>
                        value.walletName.toLowerCase() === wallet.walletName.toLowerCase()
                    ).length > 0
                  ) {
                    setError('you have a wallet with the same name / wallet cannot number');
                  } else {
                    setLoading(true);
                    // Save wallet information to backend
                    // for automatic wallet generation
                    // if user changes device in the future
                    const walletName = wallet.walletName;
                    const walletAddress = wallet.newWallet.address;
                    const walletIndex = wallet.wallets.length - 1;
                    await handleSaveWallet(walletName, walletAddress, walletIndex)
                      .then(() => {
                        setError('');
                        dispatch({
                          type: 'addWallet',
                          payload: {
                            walletName: wallet.walletName,
                            walletAddress: wallet.newWallet?.address,
                            walletPhrase: wallet.newWallet?.mnemonic,
                            walletPrivateKey: wallet.newWallet?.privateKey,
                            idrAsset: 0,
                            networks: [],
                            isNew: true,
                            createdAt: Date.now()
                          }
                        });
                        dispatch({ type: 'setNewWallet', payload: null });
                        dispatch({ type: 'setWalletName', payload: '' });
                      })
                      .then(() => setShowModal(true))
                      .catch((err) => {
                        setError(err.message);
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                }}
                _pressed={{ bg: Colors.lightGreen }}
                bg={wallet.walletName === '' ? Colors.neutral50 : Colors.green}
                width={width / 1.5}
              >
                Create Wallet
              </Button>
            </Center>
          </View>
        </>
      </TouchableWithoutFeedback>
    </DefaultBody>
  );
};

export default CreateWalletScreen;
