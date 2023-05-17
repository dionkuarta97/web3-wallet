import { useAtom } from 'jotai';
import DefaultBody from '../../components/DefaultBody';
import { bottomReducer } from '../../state/bottom/bottomReducer';
import { Center, Text, View } from 'native-base';
import { height, width } from '../../Helpers';
import { Colors } from '../../Colors';
import SelectChain from './ImportWalletContents/SelectChain';
import { useCallback, useRef } from 'react';
import { TextInput } from 'react-native';

const ImportWalletScreen = () => {
  const [bottom, setBottom] = useAtom(bottomReducer);
  const refInput = useRef<TextInput>();
  const refInputPhrase = useRef<TextInput>();
  const keyboardHide = useCallback(() => {
    refInput.current?.blur();
    refInputPhrase.current?.blur();
  }, []);

  return (
    <DefaultBody
      tapHandler={() => {
        keyboardHide();
        if (bottom.showWallet) {
          setBottom({ type: 'setShowWallet', payload: false });
        }
      }}
    >
      <Center>
        <Text fontSize={width / 20} fontWeight={'bold'} color={Colors.green}>
          Import Wallet
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
      <View flex={1} mt={height / 25}>
        <Text mb={2}>Select Chain</Text>
        <SelectChain refInputPhrase={refInputPhrase} refInput={refInput} />
      </View>
    </DefaultBody>
  );
};

export default ImportWalletScreen;
