import { Button, Center, HStack, Stack, Text, View } from 'native-base';
import DefaultBody from '../../components/DefaultBody';
import { Colors } from '../../Colors';
import { height, width } from '../../Helpers';
import InputPrivateKey from './PrivateKeyPhraseShowContents/InputPrivateKey';
import { useAtom } from 'jotai';
import { walletReducer } from '../../state/wallet/walletReducer';
import PhraseBox from './PrivateKeyPhraseShowContents/PhraseBox';
import { bottomReducer } from '../../state/bottom/bottomReducer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '../../navigations/BottomTabRouter';

const text: string[] = [
  'Write down your passphrase in a safe place',
  'DO NOT share this  private key & phrase with anyone!',
  'These words can be used to steal all your accounts.',
  'You can restore your wallet with this phrase.',
  'If you LOST this phrase you LOST your wallet'
];

const PrivateKeyPhraseShowScreen = () => {
  const [wallet] = useAtom(walletReducer);
  const [bottom, disBottom] = useAtom(bottomReducer);

  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();

  return (
    <DefaultBody
      tapHandler={() => {
        if (bottom.showWallet) {
          disBottom({ type: 'setShowWallet', payload: false });
        }
      }}
    >
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
        <View marginTop={3}>
          <Text marginBottom={2} color={Colors.green}>
            Your Passphrase
          </Text>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            space={4}
            flexWrap="wrap"
            direction={{
              base: 'row'
            }}
          >
            {wallet.newWallet?.mnemonic.split(' ').map((el, idx) => (
              <PhraseBox key={idx} no={idx + 1} text={el} />
            ))}
          </Stack>
        </View>
        <View mt={3}>
          <Text mb={2} color={Colors.green}>
            Attention !!
          </Text>
          {text.map((el, idx) => (
            <HStack key={idx} space={2}>
              <Text fontSize={width / 30} color={Colors.grayText}>
                {idx + 1 + '.'}
              </Text>
              <Text fontSize={width / 30} color={Colors.grayText}>
                {el}
              </Text>
            </HStack>
          ))}
        </View>
      </View>
      <Center marginBottom={height / 9}>
        <Button
          borderRadius={15}
          _text={{
            color: 'white',
            fontWeight: 'semibold'
          }}
          onPress={() => {
            navigation.navigate('WalletRouter', { screen: 'PrivateKeyPhraseInputScreen' });
          }}
          _pressed={{ bg: Colors.lightGreen }}
          bg={Colors.green}
          width={width / 1.5}
        >
          Continue
        </Button>
      </Center>
    </DefaultBody>
  );
};

export default PrivateKeyPhraseShowScreen;
