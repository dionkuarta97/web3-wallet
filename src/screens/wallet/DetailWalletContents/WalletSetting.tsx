import { HStack, Text, View } from 'native-base';
import { Image, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../../Colors';

type Props = {
  onPressDisconnect: (val: boolean) => void;
  setShowSetting: (val: boolean) => void;
  onPressPhrase: () => void;
  onOpenPrivateKey: () => void;
};

const WalletSetting = ({
  onPressDisconnect,
  setShowSetting,
  onPressPhrase,
  onOpenPrivateKey
}: Props) => {
  return (
    <Modal transparent={true} animationType="fade">
      <TouchableWithoutFeedback
        onPress={() => {
          setShowSetting(false);
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'black',
            opacity: 0.3
          }}
        />
      </TouchableWithoutFeedback>
      <View
        style={{
          paddingHorizontal: 8,
          position: 'relative',
          zIndex: 10,
          backgroundColor: 'white',
          paddingVertical: 4,
          elevation: 2,
          borderRadius: 8,
          width: '45%',
          left: '45%',
          top: '32%'
        }}
      >
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            {
              marginBottom: 3,
              backgroundColor: pressed ? Colors.lightGray : 'white',
              paddinVertical: 3,
              borderRadius: 5,
              paddingHorizontal: 3
            }
          ]}
        >
          <HStack alignItems={'center'} space={1}>
            <Image
              style={{
                resizeMode: 'contain',
                width: 15,
                height: 15
              }}
              source={require('../../../../assets/icon/message-edit.png')}
            />
            <Text>Change wallet name</Text>
          </HStack>
        </Pressable>
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            {
              marginBottom: 3,
              backgroundColor: pressed ? Colors.lightGray : 'white',
              paddinVertical: 3,
              borderRadius: 5,
              paddingHorizontal: 3
            }
          ]}
        >
          <HStack alignItems={'center'} space={1}>
            <Image
              style={{
                resizeMode: 'contain',
                width: 15,
                height: 15
              }}
              source={require('../../../../assets/icon/gallery.png')}
            />
            <Text>Change wallet cover</Text>
          </HStack>
        </Pressable>
        <Pressable
          onPress={() => {
            onPressPhrase();
          }}
          style={({ pressed }) => [
            {
              marginBottom: 3,
              backgroundColor: pressed ? Colors.lightGray : 'white',
              paddinVertical: 3,
              borderRadius: 5,
              paddingHorizontal: 3
            }
          ]}
        >
          <HStack alignItems={'center'} space={1}>
            <Image
              style={{
                resizeMode: 'contain',
                width: 15,
                height: 15
              }}
              source={require('../../../../assets/icon/eyeBlack.png')}
            />
            <Text>View 12 Phrase</Text>
          </HStack>
        </Pressable>
        <Pressable
          onPress={() => {
            onOpenPrivateKey();
          }}
          style={({ pressed }) => [
            {
              marginBottom: 3,
              backgroundColor: pressed ? Colors.lightGray : 'white',
              paddinVertical: 3,
              borderRadius: 5,
              paddingHorizontal: 3
            }
          ]}
        >
          <HStack alignItems={'center'} space={1}>
            <Image
              style={{
                resizeMode: 'contain',
                width: 15,
                height: 15
              }}
              source={require('../../../../assets/icon/eyeBlack.png')}
            />
            <Text>View secret key</Text>
          </HStack>
        </Pressable>
        <Pressable
          onPress={() => {
            onPressDisconnect(true);
            setShowSetting(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? Colors.lightGray : 'white',
              paddinVertical: 3,
              borderRadius: 5,
              paddingHorizontal: 3
            }
          ]}
        >
          <HStack alignItems={'center'} space={1}>
            <Image
              style={{
                resizeMode: 'contain',
                width: 15,
                height: 15
              }}
              source={require('../../../../assets/icon/link-2.png')}
            />
            <Text>Disconnect wallet</Text>
          </HStack>
        </Pressable>
      </View>
    </Modal>
  );
};

export default WalletSetting;
