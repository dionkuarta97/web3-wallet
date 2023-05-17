import { Text, View } from 'native-base';
import { Image, Pressable, TextInput } from 'react-native';
import { Colors } from '../../../Colors';
import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { height, initBackgroundFetch, scheduleTask, width } from '../../../Helpers';
import InputWalletNameImport from './InputWalletNameImport';
import InputPhraseImport from './InputPhraseImport';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createWallet, detectBalance } from '../../../api/wallet';
import LoadingModal from '../../../components/modal/LoadingModal';
import { useAtom } from 'jotai';
import { walletReducer } from '../../../state/wallet/walletReducer';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '../../../navigations/BottomTabRouter';
import ModalImportWallet from './ModalImportWallet';

type Props = {
  refInput: MutableRefObject<TextInput>;
  refInputPhrase: MutableRefObject<TextInput>;
};

const SelectChain = ({ refInput, refInputPhrase }: Props) => {
  const [val, setVal] = useState<string | null>(null);
  const [showListChain, setShowListChain] = useState(false);
  const [walletName, setWalletName] = useState('');
  const [phrase, setPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wallet, setWallet] = useAtom(walletReducer);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();

  const handleModalShow = useCallback((param: boolean) => {
    setShowModal(param);
  }, []);
  const handleShowListChain = useCallback((param: boolean) => {
    setShowListChain(param);
  }, []);
  const handleSetVal = useCallback((param: string | null) => {
    setVal(param);
  }, []);

  const handleWalletName = useCallback((param: string) => {
    setWalletName(param);
  }, []);
  const handlePhrase = useCallback((param: string) => {
    setPhrase(param);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setError('');
      };
    }, [])
  );

  return (
    <View flex={1}>
      {loading && <LoadingModal text={'Import Your Wallet'} />}
      {showModal && (
        <ModalImportWallet
          tapHandler={() => {
            handleModalShow(false);
          }}
          onPressDone={() => {
            handleModalShow(false);
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
        />
      )}
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <Pressable
          onPress={() => {
            handleShowListChain(!showListChain);
          }}
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 8,
            borderColor: val ? 'black' : Colors.neutral25
          }}
        >
          <Image
            source={
              val
                ? require('../../../../assets/coins/ethereum.png')
                : require('../../../../assets/icon/coin.png')
            }
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
              resizeMode: 'contain'
            }}
          />
          <Text color={val ? 'black' : Colors.grayText}>{val ? val : 'Choose your chain'}</Text>
          <Image
            source={
              val && !showListChain
                ? require('../../../../assets/icon/arrow-down-black.png')
                : val && showListChain
                ? require('../../../../assets/icon/arrow-up-black.png')
                : !val && showListChain
                ? require('../../../../assets/icon/arrow-up.png')
                : require('../../../../assets/icon/arrow-down.png')
            }
            style={{
              marginLeft: 'auto',
              width: 20,
              height: 20,
              resizeMode: 'contain'
            }}
          />
        </Pressable>
        {showListChain && (
          <View
            style={{
              marginTop: height / 20,
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 5,
              borderRadius: 8,
              borderColor: Colors.neutral25
            }}
          >
            <View padding={2} mb={3} justifyContent={'center'}>
              <TextInput
                editable={false}
                placeholder="Search your chain"
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: Colors.neutral25,
                  paddingLeft: width / 10
                }}
              />
              <Image
                source={require('../../../../assets/icon/search-gray.png')}
                style={{
                  width: 20,
                  height: 20,
                  left: width / 20,
                  resizeMode: 'contain',
                  position: 'absolute'
                }}
              />
            </View>
            <Pressable
              onPress={() => {
                handleSetVal('Ethereum');
                handleShowListChain(false);
              }}
              style={({ pressed }) => [
                {
                  transform: [
                    {
                      scale: pressed ? 0.99 : 1
                    }
                  ],
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10
                }
              ]}
            >
              <Image
                source={require('../../../../assets/coins/ethereum.png')}
                style={{
                  marginRight: 10,
                  width: 20,
                  height: 20,
                  resizeMode: 'contain'
                }}
              />
              <Text>Ethereum</Text>
              {!val ? (
                <View
                  style={{
                    borderRadius: 60,
                    width: 20,
                    height: 20,
                    borderColor: Colors.neutral25,
                    borderWidth: 1,
                    marginLeft: 'auto'
                  }}
                />
              ) : (
                <Image
                  source={require('../../../../assets/icon/checkFull.png')}
                  style={{
                    marginLeft: 'auto',
                    width: 20,
                    height: 20,
                    resizeMode: 'contain'
                  }}
                />
              )}
            </Pressable>
          </View>
        )}
        {val && !showListChain && (
          <>
            <View mt={10}>
              <Text mb={2}>Wallet Name</Text>
              <InputWalletNameImport
                onChange={(val) => {
                  handleWalletName(val);
                }}
                onFocused={(val) => {}}
                value={walletName}
                refInput={refInput}
              />
            </View>
            <View mt={10}>
              <Text mb={2}>Passphrase</Text>
              <InputPhraseImport
                onChange={(val) => {
                  handlePhrase(val);
                }}
                onFocused={(val) => {}}
                value={phrase}
                refInput={refInputPhrase}
              />
            </View>
          </>
        )}
        {error && (
          <Text mt={2} color={'red.600'}>
            * {error}
          </Text>
        )}
      </KeyboardAwareScrollView>
      <Pressable
        onPress={() => {
          let check = wallet.wallets.filter(
            (el) =>
              el.walletPhrase === phrase.toLowerCase() || el.walletName === walletName.toLowerCase()
          );
          setLoading(true);
          if (check.length > 0) {
            setError('Your wallet has been registered / have the same name');
            setLoading(false);
          } else {
            scheduleTask();
            initBackgroundFetch(() => {
              createWallet(phrase.toLowerCase())
                .then(async (val) => {
                  const result = await detectBalance(val.address);
                  setWallet({
                    type: 'setWallets',
                    payload: [
                      ...wallet.wallets,
                      {
                        walletAddress: val.address,
                        walletName: walletName,
                        walletPhrase: val.mnemonic,
                        walletPrivateKey: val.privateKey,
                        createdAt: Date.now(),
                        networks: result.tempNetworks,
                        idrAsset: result.idrAsset,
                        isNew: true
                      }
                    ]
                  });
                })
                .then(() => {
                  handleModalShow(true);
                })
                .catch((err) => {
                  setError('request time out');
                  console.log(err);
                })
                .finally(() => {
                  setLoading(false);
                });
            });
          }
        }}
        disabled={walletName === '' || phrase === '' ? true : false}
        style={({ pressed }) => [
          {
            position: 'absolute',
            alignSelf: 'center',
            top: height / 2,
            width: width / 1.5,
            paddingVertical: 11,
            backgroundColor: pressed
              ? Colors.lightGreen
              : walletName === '' || phrase === ''
              ? Colors.neutral25
              : Colors.green,
            borderRadius: 10
          }
        ]}
      >
        <Text alignSelf={'center'} color={'white'}>
          Import Wallet
        </Text>
      </Pressable>
    </View>
  );
};

export default SelectChain;
