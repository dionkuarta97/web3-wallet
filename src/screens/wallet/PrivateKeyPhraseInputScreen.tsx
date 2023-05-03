import { Center, Text, Button, View } from 'native-base';
import DefaultBody from '../../components/DefaultBody';
import { Colors } from '../../Colors';
import { height, width } from '../../Helpers';
import InputPrivateKey from './PrivateKeyPhraseShowContents/InputPrivateKey';
import { useAtom } from 'jotai';
import { walletReducer } from '../../state/wallet/walletReducer';
import InputPhrase from './PrivateKeyPhraseInputContents/InputPhrase';
import { useEffect, useRef, useState } from 'react';
import { Image, TextInput } from 'react-native';
import { Animated } from 'react-native';
import { bottomReducer } from '../../state/bottom/bottomReducer';
import DefaultModal from '../../components/modal/DefaultModal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WalletParamList } from '../../navigations/WalletRouter';

const PrivateKeyPhraseInputScreen = () => {
  const [phrase, setPhrase] = useState('');
  const [wallet, disWallet] = useAtom(walletReducer);
  const [bottom, disBottom] = useAtom(bottomReducer);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation<StackNavigationProp<WalletParamList>>();

  const refInput = useRef<TextInput>();
  const animatedButton = useRef(new Animated.Value(0)).current;
  const [error, setError] = useState('');
  const interpolate = animatedButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height / 9]
  });
  console.log(wallet.newWallet?.mnemonic);

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
                disWallet({
                  type: 'setWallets',
                  payload: [
                    ...wallet.wallets,
                    {
                      walletName: wallet.walletName,
                      walletAddress: wallet.newWallet.address,
                      walletPhrase: wallet.newWallet.mnemonic,
                      walletPrivateKey: wallet.newWallet.privateKey,
                      isNew: true
                    }
                  ]
                });
                disWallet({ type: 'setNewWallet', payload: null });
                disWallet({ type: 'setWalletName', payload: '' });
                disBottom({ type: 'setTabActive', payload: 'AllWalletScreen' });
                navigation.navigate('AllWalletScreen');
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
            onFocused={(val) => {
              setKeyboardShow(val);
            }}
          />
          {error !== '' && (
            <Text mt={1} color="red.600">
              {error}
            </Text>
          )}
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
          disabled={phrase === '' ? true : false}
          borderRadius={15}
          _text={{
            color: phrase === '' ? 'black' : 'white',
            fontWeight: 'semibold'
          }}
          onPress={() => {
            refInput.current.blur();
            if (wallet.newWallet?.mnemonic !== phrase) {
              setError('Wrong Passphrase, try again !!');
            } else {
              setError('');
              setShowModal(true);
            }
          }}
          _pressed={{ bg: Colors.lightGreen }}
          bg={phrase === '' ? Colors.neutral50 : Colors.green}
          width={width / 1.5}
        >
          Create Wallet
        </Button>
      </Animated.View>
    </DefaultBody>
  );
};

export default PrivateKeyPhraseInputScreen;
