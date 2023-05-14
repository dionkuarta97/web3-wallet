import DefaultBody from '../../components/DefaultBody';
import { useAtom } from 'jotai';
import { bottomReducer } from '../../state/bottom/bottomReducer';
import { Center, HStack, Text, View } from 'native-base';
import { Colors } from '../../Colors';
import { Image, ImageBackground, Pressable } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { walletReducer } from '../../state/wallet/walletReducer';
import { ScrollView } from 'react-native';
import { height } from '../../Helpers';
import { StackNavigationProp } from '@react-navigation/stack';
import { WalletParamList } from '../../navigations/WalletRouter';
import { ActivityIndicator } from 'react-native';

const AllWalletScreen = () => {
  const [bottom, setBottom] = useAtom(bottomReducer);
  const [wallet, setWallet] = useAtom(walletReducer);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<WalletParamList>>();

  useFocusEffect(
    useCallback(() => {
      let temp = 0;

      setLoading(true);
      for (const key in wallet.wallets) {
        temp += wallet.wallets[key].idrAsset;
      }
      setTotalBalance(temp);
      setLoading(false);
      return () => {
        for (const key in wallet.wallets) {
          if (wallet.wallets[key].isNew) {
            let temp = wallet.wallets[key];
            let tem = wallet.wallets.filter(
              (val) => val.walletAddress !== wallet.wallets[key].walletAddress
            );
            temp.isNew = false;
            let payload = [temp, ...tem];
            setWallet({ type: 'setWallets', payload: payload });
            break;
          }
        }
      };
    }, [])
  );

  return (
    <DefaultBody
      tapHandler={() => {
        if (bottom.showWallet) setBottom({ type: 'setShowWallet', payload: false });
      }}
    >
      <Center
        style={{
          backgroundColor: Colors.green,
          paddingVertical: 15,
          borderRadius: 15
        }}
      >
        <Text fontWeight={'bold'} fontSize={20} color={'white'}>
          All Wallet
        </Text>
      </Center>

      <>
        <Center mt={2}>
          <HStack space={3} alignItems={'center'}>
            <Text>Total Balance</Text>
            <Image
              source={require('../../../assets/icon/eyeBlack.png')}
              style={{
                resizeMode: 'contain',
                width: 18,
                height: 18
              }}
            />
          </HStack>
          <HStack alignItems={'center'} mt={2} mb={1} space={3}>
            <View borderRadius={10} borderWidth={0.5} paddingX={3} paddingY={1}>
              <Text fontSize={13}>IDR</Text>
            </View>
            <View>
              {loading ? (
                <ActivityIndicator color={Colors.green} animating={true} />
              ) : (
                <Text fontWeight={'bold'} fontSize={13}>
                  {Number(totalBalance).toLocaleString('id-ID')}
                </Text>
              )}
            </View>
          </HStack>
        </Center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingBottom: height / 8
          }}
        >
          {wallet.wallets.map((el, idx) => (
            <View
              width={'47%'}
              mt={4}
              borderRadius={10}
              height={height / 3.5}
              borderWidth={0.5}
              borderColor={Colors.gray}
              key={el.walletAddress}
            >
              <ImageBackground
                borderRadius={10}
                source={require('../../../assets/defaultWallet.png')}
                style={{
                  width: '100%',
                  height: height / 8
                }}
              >
                {el.isNew && (
                  <View
                    width={'30%'}
                    style={{
                      justifyContent: 'center',
                      padding: 5,
                      alignItems: 'center',
                      borderTopLeftRadius: 10,
                      borderBottomRightRadius: 10
                    }}
                    bg={Colors.orange}
                  >
                    <Text fontSize={12} color={'white'}>
                      New
                    </Text>
                  </View>
                )}
              </ImageBackground>
              <View paddingX={5} mt={1} alignItems={'center'}>
                <Text numberOfLines={1} fontWeight={'bold'}>
                  {el.walletName}
                </Text>
                <Text fontSize={10} ellipsizeMode="middle" numberOfLines={1}>
                  {el.walletAddress}
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('DetailWalletScreen', { indexWallet: idx });
                  }}
                  style={({ pressed }) => [
                    {
                      marginTop: height / 25,
                      borderWidth: 0.5,
                      paddingVertical: 4,
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      backgroundColor: pressed ? Colors.neutral25 : 'white'
                    }
                  ]}
                >
                  <Text fontSize={12} color={Colors.green}>
                    See More
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </>
    </DefaultBody>
  );
};

export default AllWalletScreen;
