import { Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '../../../Colors';
import { width } from '../../../Helpers';
import { Center, Text } from 'native-base';
import Success from '../../../../assets/success-import-wallet.png';

type Props = {
  onPressDone: () => void;
  tapHandler?: () => void;
};

const ModalImportWallet = ({ tapHandler = () => {}, onPressDone }: Props) => {
  const tap = Gesture.Tap().onStart(() => {
    tapHandler();
  });
  return (
    <Modal transparent={true} animationType="fade">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <GestureDetector gesture={tap}>
            <View style={styles.dimBackground} />
          </GestureDetector>
          <View style={styles.body}>
            <Center mb={4}>
              <Image
                source={Success}
                style={{
                  resizeMode: 'contain',
                  height: width / 3,
                  marginTop: width / 8,
                  marginBottom: width / 11
                }}
              />
              <Text color={Colors.green} fontWeight={'semibold'} fontSize={20}>
                Congratulation
              </Text>
              <Text
                color={Colors.grayText}
                textAlign={'center'}
                margin={width / 18}
              >{`Your Wallet has been import.`}</Text>
            </Center>
            <Pressable
              onPress={() => {
                onPressDone();
              }}
              style={({ pressed }) => [
                {
                  width: width / 2,
                  alignSelf: 'center',
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: pressed ? Colors.lightGreen : Colors.green,
                  alignItems: 'center'
                }
              ]}
            >
              <Text color={'white'}>Done</Text>
            </Pressable>
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default ModalImportWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  dimBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.3
  },
  body: {
    borderRadius: 10,
    width: width * 0.75,
    backgroundColor: 'white',
    padding: 20
  }
});
