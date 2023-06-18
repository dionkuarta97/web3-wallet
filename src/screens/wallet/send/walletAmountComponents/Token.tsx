import { VStack, Text } from 'native-base';
import { Pressable, Image } from 'react-native';
import { tokens } from './data';
import { Colors } from '../../../../Colors';
import { memo } from 'react';
import FastImage from 'react-native-fast-image';

type props = {
  el: {
    name: string;
    symbol: string;
    balance: number;
    network: string;
    price: number;
    logo: string;
  };
  search: string;
  idx: number;
  onClose: () => void;
  setSearch: (val: string) => void;
  onTap: (val: {
    name: string;
    symbol: string;
    balance: number;
    network: string;
    price: number;
    logo: string;
  }) => void;
};

const Token = ({ el, idx, onClose, setSearch, onTap, search }: props) => {
  return (
    <Pressable
      onPress={() => {
        onTap(el);
        onClose();
        setSearch('');
      }}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          borderBottomWidth:
            idx + 1 ===
            tokens.filter((val) => val.name.toLowerCase().includes(search.toLowerCase())).length
              ? 0
              : 0.5,
          opacity: pressed ? 0.7 : 1
        }
      ]}
    >
      <FastImage
        source={{ uri: el.logo }}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          height: 50,
          width: '15%'
        }}
      />
      <VStack ml={4} width={'35%'}>
        <Text fontWeight={'semibold'}>{el.symbol}</Text>
        <Text numberOfLines={1} fontSize={13} color={Colors.grayText}>
          {el.name}
        </Text>
        <Text numberOfLines={1} color={Colors.grayText} fontSize={13}>
          {el.network}
        </Text>
      </VStack>
      <Text fontSize={15} ml="auto">
        {el.balance} {el.symbol}
      </Text>
    </Pressable>
  );
};

export default memo(Token);
