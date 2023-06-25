import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Pressable, Text, View, useDisclose } from 'native-base';
import { Image, ImageSourcePropType } from 'react-native';
import { width } from '../../Helpers';
import { Colors } from '../../Colors';
import ActionBottomSheet from '../bottomSheet/ActionBottomSheet';

const ActionbottomTab = (
  props: BottomTabBarButtonProps & {
    label: string;
    image: ImageSourcePropType;
  }
) => {
  const isFocused: boolean = props.accessibilityState.selected;
  const { isOpen, onClose, onOpen } = useDisclose();
  return (
    <>
      <Pressable
        onPress={() => onOpen()}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          zIndex: 10
        }}
      >
        <Image
          source={props.image}
          style={{
            width: width / 15,
            height: width / 15,
            resizeMode: 'contain',
            transform: [{ scale: isFocused ? 1.1 : 1 }]
          }}
        />
        <Text fontSize={13}>{props.label}</Text>
        <View
          style={{
            marginTop: 5,
            borderRadius: 100,
            borderTopWidth: 3,
            borderColor: isFocused ? Colors.green : 'white',
            width: width / 15
          }}
        />
      </Pressable>
      <ActionBottomSheet isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ActionbottomTab;
