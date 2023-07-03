import { ScrollView, Text, VStack, View } from 'native-base';
import { height } from '../../../Helpers';
import { Colors } from '../../../Colors';
import { memo, useEffect, useRef } from 'react';
import { Animated, Image, Pressable } from 'react-native';
import { useAtom } from 'jotai';
import { walletReducer } from '../../../state/wallet/walletReducer';

const DropDown = ({
  show,
  setShow,
  onTap,
  address
}: {
  show: boolean;
  setShow: (val: boolean) => void;
  onTap: (val: { address: string; name: string }) => void;
  address: string | null;
}) => {
  const [wallet] = useAtom(walletReducer);
  const animasi = useRef(new Animated.Value(0)).current;
  const animasiInterpolate = animasi.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height / 3.5]
  });

  useEffect(() => {
    if (show) {
      Animated.spring(animasi, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(animasi, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false
      }).start();
    }
  }, [show]);

  return (
    <Animated.View
      style={{
        width: '100%',
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'white',
        borderWidth: show ? 1 : 0,
        borderColor: Colors.neutral50,
        borderRadius: 10,
        top: height / 14,
        height: animasiInterpolate,
        padding: 10
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} onStartShouldSetResponder={() => true}>
        {wallet.wallets.map((el, idx) => (
          <Pressable
            key={idx}
            onPress={() => {
              setShow(false);
              onTap({
                address: el.walletAddress,
                name: el.walletName
              });
            }}
            style={({ pressed }) => [
              {
                flexDirection: 'row',
                marginBottom: 15,
                alignItems: 'center',
                padding: 2,
                opacity: pressed ? 0.7 : 1
              }
            ]}
          >
            <View width={35} opacity={0.7} height={35} borderRadius={100} bg={'#F7931A'} />
            <VStack ml={3} width={'70%'}>
              <Text fontSize={16} color={Colors.green} ellipsizeMode="middle" numberOfLines={1}>
                {el.walletAddress}
              </Text>
              <Text numberOfLines={1} color={Colors.grayText}>
                {el.walletName}
              </Text>
            </VStack>
            {address === el.walletAddress ? (
              <Image
                source={require('../../../../assets/icon/checkFull.png')}
                style={{
                  marginLeft: 'auto',
                  width: 20,
                  height: 20,
                  resizeMode: 'contain'
                }}
              />
            ) : (
              <View
                borderWidth={1}
                style={{
                  width: 20,
                  height: 20
                }}
                borderColor={Colors.green}
                ml={'auto'}
                borderRadius={60}
              />
            )}
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default memo(DropDown);
