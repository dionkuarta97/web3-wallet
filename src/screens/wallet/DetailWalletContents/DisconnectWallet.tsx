import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '../../../Colors';
import { width } from '../../../Helpers';
import { Center, Text } from 'native-base';

type Props = {
  onPressCancel: () => void;

  handleSetWallet: () => void;
};

const DisconnectWallet = ({ onPressCancel, handleSetWallet }: Props) => {
  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.dimBackground} />

        <View style={styles.body}>
          <Center mb={4}>
            <Text>Do you want to disconnect this wallet?</Text>
          </Center>
          <Pressable
            onPress={() => {
              handleSetWallet();
              onPressCancel();
            }}
            style={({ pressed }) => [
              {
                borderWidth: 0.8,
                borderRadius: 8,
                padding: 10,
                backgroundColor: pressed ? Colors.lightGray : 'white',
                marginBottom: 5,
                alignItems: 'center'
              }
            ]}
          >
            <Text>Disconnect</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              onPressCancel();
            }}
            style={({ pressed }) => [
              {
                borderRadius: 8,
                padding: 10,
                backgroundColor: pressed ? Colors.lightGreen : Colors.green,
                alignItems: 'center'
              }
            ]}
          >
            <Text color={'white'}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DisconnectWallet;

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
