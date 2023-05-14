import { Text, View } from 'native-base';
import { Colors } from '../../../Colors';
import { Pressable } from 'react-native';

type Props = {
  active: string;
  onPress: (val: string) => void;
};
const DetailHeader = ({ active, onPress = () => {} }: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.green,
        borderRadius: 15
      }}
    >
      <Pressable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '33%',
          paddingVertical: 18
        }}
        onPress={() => {
          onPress('token');
        }}
      >
        <View
          borderBottomWidth={1}
          borderBottomColor={active === 'token' ? 'white' : Colors.green}
          paddingX={1}
          paddingBottom={1}
        >
          <Text
            fontWeight={active === 'token' ? 'bold' : 'normal'}
            color={active === 'token' ? 'white' : Colors.grayText075}
          >
            Token
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '33%',
          paddingVertical: 18
        }}
        onPress={() => {
          onPress('nft');
        }}
      >
        <View
          borderBottomWidth={1}
          borderBottomColor={active === 'nft' ? 'white' : Colors.green}
          paddingX={1}
          paddingBottom={1}
        >
          <Text
            fontWeight={active === 'nft' ? 'bold' : 'normal'}
            color={active === 'nft' ? 'white' : Colors.grayText075}
          >
            NFT
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '33%',
          paddingVertical: 18
        }}
        onPress={() => {
          onPress('history');
        }}
      >
        <View
          borderBottomWidth={1}
          borderBottomColor={active === 'history' ? 'white' : Colors.green}
          paddingX={1}
          paddingBottom={1}
        >
          <Text
            fontWeight={active === 'history' ? 'bold' : 'normal'}
            color={active === 'history' ? 'white' : Colors.grayText075}
          >
            History
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default DetailHeader;
