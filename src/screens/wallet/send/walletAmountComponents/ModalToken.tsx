import { HStack, ScrollView, Text, VStack, View } from 'native-base';
import { Image, Pressable, TextInput, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { height, width } from '../../../../Helpers';
import { Colors } from '../../../../Colors';
import { memo, useState } from 'react';
import { tokens } from './data';
import Token from './Token';
type Props = {
  show: boolean;
  onClose: () => void;
  onTap: (val: {
    name: string;
    symbol: string;
    balance: number;
    network: string;
    price: number;
    logo: string;
  }) => void;
};

const ModalToken = ({ onTap, show, onClose }: Props) => {
  const [search, setSearch] = useState('');
  return (
    <Modal
      customBackdrop={
        <TouchableWithoutFeedback
          onPress={() => {
            onClose();
            setSearch('');
          }}
        >
          <View bg={'black'} opacity={0.5} style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      }
      style={{
        justifyContent: 'flex-end',
        margin: 0
      }}
      isVisible={show}
    >
      <View bg={'white'} px={8} height={height / 2.5} borderTopRadius={20} width={width}>
        <View
          my={4}
          alignSelf={'center'}
          width={width / 3}
          borderTopWidth={3}
          borderRadius={20}
          borderColor={Colors.green}
        />
        <TextInput
          onChangeText={(val) => {
            setSearch(val);
          }}
          placeholder="search"
          style={{
            borderRadius: 10,
            borderColor: Colors.green,
            paddingHorizontal: 10,
            width: width / 1.2,
            height: height / 18,
            borderWidth: 1
          }}
        />
        <View
          mt={2}
          mb={4}
          alignSelf={'center'}
          width={width}
          borderTopWidth={1}
          borderRadius={20}
          borderColor={Colors.green}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {tokens
            .filter((val) => val.name.toLowerCase().includes(search.toLowerCase()))
            .map((el, idx) => (
              <Token
                key={idx}
                el={el}
                idx={idx}
                setSearch={setSearch}
                onClose={onClose}
                onTap={onTap}
                search={search}
              />
            ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default memo(ModalToken);
