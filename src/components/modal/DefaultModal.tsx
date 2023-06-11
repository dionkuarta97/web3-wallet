import { ReactNode } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '../../Colors';
import { height, width } from '../../Helpers';

type Props = {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
};

const DefaultModal = ({ header, body, footer }: Props) => {
  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.dimBackground} />
        <View style={styles.header}>{header}</View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          {body}
        </ScrollView>
        <View style={styles.footer}>{footer}</View>
      </View>
    </Modal>
  );
};

export default DefaultModal;

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
    opacity: 0.1
  },
  header: {
    borderRadius: 15,
    backgroundColor: Colors.green,
    width: width * 0.9,
    alignItems: 'center',
    padding: width * 0.06,
    top: 10,
    zIndex: 1
  },
  body: {
    width: width * 0.9,
    maxHeight: height * 0.6,
    backgroundColor: 'white',
    paddingHorizontal: width * 0.06,
    flexGrow: 0
  },
  footer: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    width: width * 0.9,
    padding: width * 0.06
  }
});
