import { Modal, Pressable, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '../../../Colors';
import { width } from '../../../Helpers';
import { Center, HStack, Text, View, useToast } from 'native-base';

import Clipboard from '@react-native-clipboard/clipboard';

type Props = {
  tapHandler?: () => void;
  title: string & {};
  desc: string & {};
  secret: string & {};
};

const ModalShow = ({ tapHandler = () => {}, title, desc, secret }: Props) => {
  const toast = useToast();
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
              <Text textAlign={'center'} color={Colors.green} fontWeight={'semibold'} fontSize={20}>
                {title}
              </Text>
              <Text fontSize={13} color={'red.400'} textAlign={'center'} margin={width / 20}>
                {desc}
              </Text>
            </Center>
            <HStack
              borderRadius={8}
              mb={width / 30}
              borderWidth={0.8}
              paddingY={6}
              paddingX={3}
              space={2}
              alignItems={'center'}
            >
              <View width={'90%'}>
                <Text textAlign={'center'}>{secret}</Text>
              </View>
              <View width={'10%'}>
                <TouchableOpacity
                  style={{
                    padding: 3
                  }}
                  onPress={() => {
                    Clipboard.setString(secret);
                    toast.show({
                      description: 'copy to clipboard'
                    });
                  }}
                >
                  <Image
                    source={require('../../../../assets/icon/copyBlack.png')}
                    style={{
                      resizeMode: 'contain',
                      height: 20,
                      width: 20
                    }}
                  />
                </TouchableOpacity>
              </View>
            </HStack>
            <Pressable
              onPress={() => {
                tapHandler();
              }}
              style={({ pressed }) => [
                {
                  width: width / 1.3,
                  alignSelf: 'center',
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: pressed ? Colors.lightGreen : Colors.green,
                  alignItems: 'center'
                }
              ]}
            >
              <Text color={'white'}>Close</Text>
            </Pressable>
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default ModalShow;

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
    width: width * 0.85,
    backgroundColor: 'white',
    padding: 20
  }
});
