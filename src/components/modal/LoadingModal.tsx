import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { height, width } from '../../Helpers';
import { Colors } from '../../Colors';
import { Text } from 'native-base';

const LoadingModal = ({ text = 'Please Wait' }: { text?: string & {} }) => {
  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.dimBackground} />
        <View style={styles.body}>
          <ActivityIndicator color={Colors.green} size={'large'} animating={true} />
          <Text color={Colors.green} mt={2}>
            {text}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center'
  },
  dimBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.3
  },
  body: {
    width: width * 0.7,
    maxHeight: height * 0.3,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  }
});
