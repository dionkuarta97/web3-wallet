import DefaultBody from '../../components/DefaultBody';
import HomeCarousel from './homeContent/HomeCarousel';
import { FlatGrid } from 'react-native-super-grid';
import { crypto, services } from './homeContent/data';
import ServicePress from './homeContent/ServicePress';
import { HStack, Text, VStack, View } from 'native-base';
import { Colors } from '../../Colors';
import { Image, ImageBackground, ScrollView } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { walletReducer } from '../../state/wallet/walletReducer';
import { height, width } from '../../Helpers';
import { createWallet, detectBalance } from '../../api/wallet';
import { authReducer } from '../../state/auth/authReducer';
import LoadingModal from '../../components/modal/LoadingModal';
import { ethers } from 'ethers';
import { NewWallet } from '../../api/wallet';
import { WebView } from 'react-native-webview';
import { ARISE_WALLET_GENERATOR_BASE_URL } from '@env';
import { createUser, getUser } from '../../api/users';
import { getCreatedHdWallets, HDWallet } from '../../api/wallet/get-created-hd-wallets';
import { NetworkType, getOrSaveWallet } from '../../api/wallet/save-wallet';

console.log({ ARISE_WALLET_GENERATOR_BASE_URL })

const HomeScreen = () => {
  const [wallet, setWallet] = useAtom(walletReducer);
  const [auth] = useAtom(authReducer);
  const [loading, setLoading] = useState(false);
  const [startBackgroundTask, setStartBackgroundTask] = useState(false);
  const [injectedJavaScript, setInjectedJavaScript] = useState('');
  const [createdHDWallets, setCreatedHDWallets] = useState<HDWallet[]>([]);

  const makeDefaultWallet = async (): Promise<ethers.Wallet> => {
    const wallet = new ethers.Wallet(auth.userInfo.privKey);
    const mnemonic = auth.userInfo.userInfo.dappShare;
    const result = await detectBalance(wallet.address);
    setWallet({
      type: 'setAriseWallet',
      payload: {
        walletAddress: wallet.address,
        walletName: 'Main Wallet',
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
        walletName: 'Main Wallet',
        walletPhrase: mnemonic,
        walletPrivateKey: wallet.privateKey,
        createdAt: Date.now(),
        networks: result.tempNetworks,
        idrAsset: result.idrAsset,
        isNew: true
      }
    });

    return wallet;
  }

  const getOrCreateAriseUser = async (masterWallet: ethers.Wallet) => {
    let user = await getUser(masterWallet.address, auth.userInfo.userInfo.typeOfLogin);
    if (!user) {
      user = await createUser(masterWallet.address, auth.userInfo.userInfo.typeOfLogin);
    }
    setAuth({
      type: 'setUserInfo',
      payload: { ...auth.userInfo, ariseUserUuid: user.uuid as string }
    });
    return user;
  }

  const saveAriseWallet = async (userUuid: string, masterWallet: ethers.Wallet) => {
    const savedWallet = await getOrSaveWallet({
      name: 'Main Wallet',
      address: masterWallet.address,
      hd_wallet_index: -1,
      network_type: NetworkType.EVM,
      user_uuid: userUuid,
    })
    
    return savedWallet;
  }

  const getCreatedWallets = async (userUuid: string) => {
    const wallets = await getCreatedHdWallets(userUuid);
    console.log('getCreatedWallets', { wallets });
    setCreatedHDWallets(wallets);
    return wallets;
  }

  const startGenerateHDWallets = async (masterWalletPrivateKey: string, numWallets: number) => {
    // window.numWallets is the number of HD wallets
    // TODO: number of HD wallets should depends on
    // how many wallets the user has generated
    // this probably should be stored in backend
    setInjectedJavaScript(`(function() {
      window.privateKey = "${masterWalletPrivateKey}"
      window.walletIndex = ${0}
      window.numWallets = ${numWallets}
    })();`);
    // this will render WebView
    // which will generate HD wallets
    // in the background
    setStartBackgroundTask(true);
  }

  useEffect(() => {
    // If wallet.ariseWallet is null,
    // It means it is the first time the user logs in
    if (wallet.ariseWallet) {
      return
    }
    (async () => {
      setLoading(true);
      try {
        const masterWallet = await makeDefaultWallet();
        const user = await getOrCreateAriseUser(masterWallet);
        console.log({ user });
        const savedWallet = await saveAriseWallet(user.uuid, masterWallet);
        const createdWallets = await getCreatedWallets(user.uuid);
        await startGenerateHDWallets(masterWallet.privateKey, createdWallets.length);
      } catch (err) {
        // TODO: Error handling
        console.log({ err })
      }
      // loading is set to false in
      // WebView onMessage callback
      // after HD wallets are generated
    })()
  }, [wallet.ariseWallet]);

  return (
    <DefaultBody>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && <LoadingModal />}
        {startBackgroundTask && (
          <WebView
            source={{ uri: ARISE_WALLET_GENERATOR_BASE_URL + '/hd-wallet' }}
            injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
            onError={(event) => {
              console.error('HomeScreen: error from webview', { event: event.nativeEvent })
            }}
            onMessage={(event) => {
              console.log('HomeScreen: message from webview', { event: JSON.parse(event.nativeEvent.data) });
              const newWallets = JSON.parse(event.nativeEvent.data) as NewWallet[];
              for (let i = 0; i < newWallets.length; i++) {
                const wallet = newWallets[i];
                const walletName = createdHDWallets[i].name;
                setWallet({ 
                  type: 'addWallet',
                  payload: { 
                    walletAddress: wallet.address,
                    walletName: walletName,
                    walletPhrase: "",
                    walletPrivateKey: wallet.privateKey,
                    createdAt: Date.now(),
                    // networks: result.tempNetworks,
                    // idrAsset: result.idrAsset,
                    networks: [],
                    idrAsset: 0,
                    isNew: true
                  }
                });
              }
              setStartBackgroundTask(false);
              setLoading(false);
            }}
          />
        )}
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
