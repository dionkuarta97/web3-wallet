import { Center, Text, Button, View } from 'native-base';
import DefaultBody from '../../components/DefaultBody';
import { Colors } from '../../Colors';
import { height, width } from '../../Helpers';
import InputPrivateKey from './PrivateKeyPhraseShowContents/InputPrivateKey';
import { useAtom } from 'jotai';
import { walletReducer } from '../../state/wallet/walletReducer';
import InputPhrase from './PrivateKeyPhraseInputContents/InputPhrase';
import { useRef, useState } from 'react';
import { Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import DefaultModal from '../../components/modal/DefaultModal';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingModal from '../../components/modal/LoadingModal';
import { BottomTabParamList } from '../../navigations/BottomTabRouter';
import { detectBalance } from '../../api/wallet';

const PrivateKeyPhraseInputScreen = () => {
  const [wallet, disWallet] = useAtom(walletReducer);
  const [showModal, setShowModal] = useState(false);
  const [phrase, setPhrase] = useState('');
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();
  const [loading, setLoading] = useState(false);
  const refInput = useRef<TextInput>();

  const [error, setError] = useState('');

  return (
    <DefaultBody>
      <TouchableWithoutFeedback
        onPress={() => {
          refInput.current?.blur();
        }}
      >
        <>
          {loading && <LoadingModal text={'Create New Wallet'} />}
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
              <Text fontSize={width / 18} fontWeight={'bold'} color={Colors.green}>
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
            <View marginTop={height / 20}>
              <Text marginBottom={2} color={Colors.green}>
                Private Key
              </Text>
              <InputPrivateKey value={wallet.newWallet?.privateKey} />
            </View>
            <View mt={2}>
              <Text marginBottom={2} color={Colors.green}>
                Your Passphrase
              </Text>
              <InputPhrase
                onChange={(val) => {
                  setPhrase(val);
                }}
                refInput={refInput}
                value={phrase}
                onFocused={(val) => {}}
              />
              {error !== '' && (
                <Text mt={1} color="red.600">
                  {error}
                </Text>
              )}
            </View>
            <Center marginTop={height * 0.3}>
              <Button
                disabled={phrase === '' ? true : false}
                borderRadius={15}
                _text={{
                  color: phrase === '' ? 'black' : 'white',
                  fontWeight: 'semibold'
                }}
                onPress={async () => {
                  refInput.current.blur();
                  if (wallet.newWallet?.mnemonic !== phrase.toLowerCase()) {
                    setError('Wrong Passphrase, try again !!');
                  } else {
                    if (
                      wallet.wallets.filter(
                        (value: { walletName: string }) =>
                          value.walletName.toLowerCase() === wallet.walletName.toLowerCase()
                      ).length > 0
                    ) {
                      setError('you have a wallet with the same name / wallet cannot number');
                    } else {
                      setLoading(true);
                      detectBalance(wallet.newWallet?.address, true)
                        .then((data: any) => {
                          setError('');
                          let payload = [
                            {
                              walletName: wallet.walletName,
                              walletAddress: wallet.newWallet?.address,
                              walletPhrase: wallet.newWallet?.mnemonic,
                              walletPrivateKey: wallet.newWallet?.privateKey,
                              idrAsset: data.idrAsset,
                              networks: data.tempNetworks,
                              isNew: true,
                              createdAt: Date.now()
                            },
                            ...wallet.wallets
                          ];

                          return payload;
                        })
                        .then((payload) => {
                          disWallet({
                            type: 'setWallets',
                            payload: payload
                          });
                          disWallet({ type: 'setNewWallet', payload: null });
                          disWallet({ type: 'setWalletName', payload: '' });
                        })
                        .then(() => {
                          setShowModal(true);
                        })
                        .catch((err) => {
                          console.log(err);

                          setError('Request time out');
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    }
                  }
                }}
                _pressed={{ bg: Colors.lightGreen }}
                bg={phrase === '' ? Colors.neutral50 : Colors.green}
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

export default PrivateKeyPhraseInputScreen;
