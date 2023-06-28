import { VStack, Text } from 'native-base';
import { Pressable, Image } from 'react-native';
import { tokens } from './data';
import { Colors } from '../../../../Colors';
import { memo } from 'react';
import FastImage from 'react-native-fast-image';
import { ethers } from 'ethers';
import { TokenType } from '../../../../state/wallet/walletTypes';
import { displayToken } from '../../../../Helpers';

type props = {
  token: TokenType;
  search: string;
  idx: number;
  onClose: () => void;
  setSearch: (val: string) => void;
  onTap: (token: TokenType) => void;
};

const Token = ({ token, idx, onClose, setSearch, onTap, search }: props) => {
  return (
    <Pressable
      onPress={() => {
        onTap(token);
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
        source={{ uri: token.logo }}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          height: 50,
          width: '15%'
        }}
      />
      <VStack ml={4} width={'35%'}>
        <Text fontWeight={'semibold'}>{token.symbol}</Text>
        <Text numberOfLines={1} fontSize={13} color={Colors.grayText}>
          {token.name}
        </Text>
        {/* <Text numberOfLines={1} color={Colors.grayText} fontSize={13}>
          {token.}
        </Text> */}
      </VStack>
      <Text fontSize={15} ml="auto">
        {displayToken(token.balance, token.decimals)} {token.symbol}
      </Text>
    </Pressable>
  );
};

export default memo(Token);
