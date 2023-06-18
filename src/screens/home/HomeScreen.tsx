import DefaultBody from '../../components/DefaultBody';
import HomeCarousel from './homeContent/HomeCarousel';
import { FlatGrid } from 'react-native-super-grid';
import { apps, crypto, services } from './homeContent/data';
import ServicePress from './homeContent/ServicePress';
import { HStack, Text, VStack, View } from 'native-base';
import { Colors } from '../../Colors';
import { Image, ImageBackground, ScrollView } from 'react-native';
import AppPress from './homeContent/AppPress';
import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { walletReducer } from '../../state/wallet/walletReducer';
import { height, initBackgroundFetch, scheduleTask, width } from '../../Helpers';
import { createWallet, detectBalance } from '../../api/wallet';
import { authReducer } from '../../state/auth/authReducer';
import LoadingModal from '../../components/modal/LoadingModal';
import { ethers } from 'ethers';

const HomeScreen = () => {
  const [wallet, setWallet] = useAtom(walletReducer);
  const [auth, setAuth] = useAtom(authReducer);
  const [loading, setLoading] = useState(false);

  const makeDefaultWallet = useCallback(async () => {
    if (!wallet.ariseWallet) {
      setLoading(true);
      const wallet = new ethers.Wallet(auth.userInfo.privKey);
      const mnemonic = auth.userInfo.userInfo.dappShare;
      const result = await detectBalance(wallet.address);
      setWallet({
        type: 'setAriseWallet',
        payload: {
          walletAddress: wallet.address,
          walletName: 'Arise Wallet',
          walletPhrase: mnemonic,
          walletPrivateKey: wallet.privateKey,
          createdAt: Date.now(),
          networks: result.tempNetworks,
          idrAsset: result.idrAsset,
          isNew: false
        }
      });
      setWallet({
        type: 'addWallet',
        payload: {
          walletAddress: wallet.address,
          walletName: 'Arise Wallet',
          walletPhrase: mnemonic,
          walletPrivateKey: wallet.privateKey,
          createdAt: Date.now(),
          networks: result.tempNetworks,
          idrAsset: result.idrAsset,
          isNew: true
        }
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    makeDefaultWallet();
  }, []);

  return (
    <DefaultBody>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && <LoadingModal />}
        <HomeCarousel />
        <Text mt={5} color={Colors.green} fontSize={18} fontWeight={'semibold'}>
          Services
        </Text>
        <FlatGrid
          data={services}
          itemContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 5
          }}
          maxItemsPerRow={4}
          spacing={8}
          scrollEnabled={false}
          style={{
            flexGrow: 0
          }}
          itemDimension={10}
          renderItem={({ item }) => <ServicePress logo={item.logo} name={item.name} />}
        />
        <HStack alignItems={'center'}>
          <Text color={Colors.green} fontSize={18} fontWeight={'semibold'}>
            D’apps
          </Text>
          <Text color={Colors.grayText} marginLeft={'auto'}>
            See All
          </Text>
        </HStack>
        <View alignItems={'center'}>
          <ImageBackground
            resizeMode="cover"
            source={require('../../../assets/dapp-not-found.png')}
            style={{
              width: width,
              height: height / 3,
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <Text
              fontWeight={'bold'}
              fontSize={17}
              style={{
                marginBottom: height / 10
              }}
            >
              No D’apps, Please Search
            </Text>
          </ImageBackground>
        </View>
        <HStack mb={8} alignItems={'center'}>
          <Text color={Colors.green} fontSize={18} fontWeight={'semibold'}>
            D’apps
          </Text>
          <Text color={Colors.grayText} marginLeft={'auto'}>
            See More
          </Text>
        </HStack>
        {crypto.map((el, idx) => (
          <HStack
            alignItems={'center'}
            key={idx + 'crypto'}
            mb={idx + 1 === crypto.length ? height / 5 : 4}
          >
            <Image
              source={el.icon}
              style={{
                resizeMode: 'contain',
                height: height / 20,
                width: '10%'
              }}
            />
            <VStack ml={4} width={'25%'}>
              <Text fontWeight={'semibold'} numberOfLines={1}>
                {el.name}
              </Text>
              <Text fontSize={12} numberOfLines={1} color={Colors.grayText}>
                {el.desc}
              </Text>
            </VStack>
            <Image
              source={el.chart}
              style={{
                resizeMode: 'contain',
                width: '20%',
                height: height / 25,
                marginLeft: width / 10
              }}
            />
            <VStack width={'25%'} ml={'auto'} alignItems={'flex-end'}>
              <Text fontWeight={'semibold'} numberOfLines={1}>
                IDR {el.harga}
              </Text>
              <Text fontSize={12} numberOfLines={1} color={'red.400'}>
                {el.persen} %
              </Text>
            </VStack>
          </HStack>
        ))}
      </ScrollView>
    </DefaultBody>
  );
};

export default HomeScreen;
