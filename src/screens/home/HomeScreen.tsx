import DefaultBody from '../../components/DefaultBody';
import HomeCarousel from './homeContent/HomeCarousel';
import { FlatGrid } from 'react-native-super-grid';
import { apps, services } from './homeContent/data';
import ServicePress from './homeContent/ServicePress';
import { HStack, Text, View } from 'native-base';
import { Colors } from '../../Colors';
import { ImageBackground, ScrollView } from 'react-native';
import AppPress from './homeContent/AppPress';
import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { walletReducer } from '../../state/wallet/walletReducer';
import { height, initBackgroundFetch, scheduleTask, width } from '../../Helpers';
import { createWallet, detectBalance } from '../../api/wallet';
import { authReducer } from '../../state/auth/authReducer';
import LoadingModal from '../../components/modal/LoadingModal';

const HomeScreen = () => {
  const [wallet, setWallet] = useAtom(walletReducer);
  const [auth, setAuth] = useAtom(authReducer);
  const [loading, setLoading] = useState(false);
  const makeDefaultWallet = useCallback(() => {
    if (!wallet.ariseWallet) {
      setLoading(true);
      scheduleTask();
      initBackgroundFetch(() => {
        createWallet('', auth.userInfo.privKey)
          .then(async (val) => {
            const result = await detectBalance(val.address);
            setWallet({
              type: 'setAriseWallet',
              payload: {
                walletAddress: val.address,
                walletName: 'Arise Wallet',
                walletPhrase: val.mnemonic,
                walletPrivateKey: val.privateKey,
                createdAt: Date.now(),
                networks: result.tempNetworks,
                idrAsset: result.idrAsset,
                isNew: false
              }
            });
            setWallet({
              type: 'addWallet',
              payload: {
                walletAddress: val.address,
                walletName: 'Arise Wallet',
                walletPhrase: val.mnemonic,
                walletPrivateKey: val.privateKey,
                createdAt: Date.now(),
                networks: result.tempNetworks,
                idrAsset: result.idrAsset,
                isNew: true
              }
            });
          })
          .finally(() => {
            setLoading(false);
          });
      });
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
              height: height / 2.8,
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
      </ScrollView>
    </DefaultBody>
  );
};

export default HomeScreen;
