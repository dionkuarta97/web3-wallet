import { HStack, Text, View, useDisclose, useToast } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { displayToken, height, width } from '../../../Helpers';
import { useAtom } from 'jotai';
import { walletReducer } from '../../../state/wallet/walletReducer';
import LinearGradient from 'react-native-linear-gradient';
import { Wallet } from '../../../state/wallet/walletTypes';
import Clipboard from '@react-native-clipboard/clipboard';
import { Colors } from '../../../Colors';
import TokenButton from './TokenButton';
import Send from '../../../../assets/icon/send.png';
import Receive from '../../../../assets/icon/receive.png';
import Topup from '../../../../assets/icon/topup.png';
import WalletSetting from './WalletSetting';
import DisconnectWallet from './DisconnectWallet';
import ModalSuccessDisconnect from './ModalSuccessDisconnect';
import InputPinBottomSheet from './InputPinBottomSheet';
import ModalShow from './ModalShow';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '../../../navigations/BottomTabRouter';
import { detectBalance } from '../../../api/wallet';
import LoadingModal from '../../../components/modal/LoadingModal';
import SendBottomSheet from './bottomSheet/SendBottomSheet';
import { ethers } from 'ethers';

type Props = {
  activeSlide: number;
  setActiveSlide: (val: number) => void;
  setShowSetting: (val: boolean) => void;
  showSetting: boolean;
};

const buttons: { name: string; icon: ImageSourcePropType }[] = [
  { name: 'Send', icon: Send },
  { name: 'Receive', icon: Receive },
  { name: 'Top Up', icon: Topup },
  { name: 'Swap', icon: require('../../../../assets/icon/swap.png') }
];

const TokenContent = ({ showSetting, activeSlide, setActiveSlide, setShowSetting }: Props) => {
  const [wallet, setWallet] = useAtom(walletReducer);
  const itemWidth = Math.round(width * 0.85);
  const [swipe, setSwipe] = useState(false);
  const [showModalSuccessDisconnect, setShowModalSuccessDisconnect] = useState(false);
  const [modalShowPhrase, setModalShowPhrase] = useState(false);
  const [modalShowSecret, setModalShowSecret] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    refreshWalletBalance();
  }, []);

  const onRefresh = useCallback(() => {
    refreshWalletBalance();
  }, []);

  const refreshWalletBalance = async () => {
    // setRefreshing(true);
    const { idrValue, networks } = await detectBalance(wallet.wallets[activeSlide].walletAddress);
    try {
      const activeWallet = {
        ...wallet.wallets[activeSlide],
        networks,
        idrAsset: idrValue
      };
      setWallet({
        type: 'setWalletByAddress',
        payload: activeWallet
      });
    } catch (error) {
      console.log(error);
    }
    // setRefreshing(false);
  };

  const phrase = useDisclose();
  const privatKey = useDisclose();

  const pressSwipe = useCallback(() => {
    setSwipe(!swipe);
  }, [swipe]);

  const swipeOnSnap = useCallback(() => {
    setSwipe(false);
  }, []);

  const handleSetWallet = useCallback((param: string, val: boolean) => {
    let temp = wallet.wallets.filter((val: Wallet) => val.walletAddress !== param);
    setWallet({ type: 'setWallets', payload: temp });
    setShowModalSuccessDisconnect(val);
  }, []);

  const handlePressDoneDisconnect = useCallback((param: boolean) => {
    setShowModalSuccessDisconnect(param);
  }, []);

  const handleModalShowPhrase = useCallback((param: boolean) => {
    setModalShowPhrase(param);
  }, []);
  const handleModalShowSecret = useCallback((param: boolean) => {
    setModalShowSecret(param);
  }, []);

  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();

  return (
    <View style={{ marginTop: 15, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <InputPinBottomSheet
        desc={'If someone know your secret phrase,\nthey can stolen your wallet'}
        onTrue={(val) => handleModalShowPhrase(val)}
        buttonText="See Passphrase"
        isOpen={phrase.isOpen}
        onClose={phrase.onClose}
      />
      <InputPinBottomSheet
        desc={'If someone know your secret key,\nthey can stolen your wallet'}
        onTrue={(val) => handleModalShowSecret(val)}
        buttonText="See Secret Key"
        isOpen={privatKey.isOpen}
        onClose={privatKey.onClose}
      />
      {modalShowPhrase && (
        <ModalShow
          secret={wallet.wallets[activeSlide].walletPhrase}
          title={'Your Passphrase Recovery'}
          desc={
            'DO NOT share this phrase with anyone! These words can be used to steal all your accounts.'
          }
          onClose={() => handleModalShowPhrase(false)}
        />
      )}
      {modalShowSecret && (
        <ModalShow
          secret={wallet.wallets[activeSlide].walletPrivateKey}
          title={'Your Private Key Recovery'}
          desc={
            'DO NOT share this secret key with anyone! These words can be used to steal all your accounts.'
          }
          onClose={() => handleModalShowSecret(false)}
        />
      )}
      {showModalSuccessDisconnect && (
        <ModalSuccessDisconnect
          onPressDone={() => {
            handlePressDoneDisconnect(false);
            navigation.goBack();
          }}
        />
      )}
      <Carousel
        layout={'default'}
        data={wallet.wallets}
        firstItem={activeSlide}
        itemWidth={itemWidth}
        sliderWidth={width}
        onSnapToItem={(idx) => {
          setActiveSlide(idx);
          setShowSetting(false);
          if (swipe) swipeOnSnap();
        }}
        updateCellsBatchingPeriod={100}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        initialNumToRender={30}
        windowSize={3}
        legacyImplementation={true}
        renderItem={(item) => (
          <RenderItem
            navigation={navigation}
            onRefresh={onRefresh}
            refreshing={refreshing}
            item={item}
            showSetting={showSetting}
            activeSlide={activeSlide}
            pressSwipe={pressSwipe}
            swipe={swipe}
            setShowSetting={setShowSetting}
            setWallet={handleSetWallet}
            onOpenPhrase={phrase.onOpen}
            onOpenPrivateKey={privatKey.onOpen}
          />
        )}
        enableMomentum={true}
        disableIntervalMomentum={true}
        decelerationRate={0.25}
      />
    </View>
  );
};

export default TokenContent;

type PropsRender = {
  item: any;
  showSetting: boolean;
  activeSlide: number;
  pressSwipe: { (): void; (): void };
  swipe: boolean;
  setShowSetting: (val: boolean) => void;
  setWallet: (param: string, val: boolean) => void;
  onOpenPhrase: () => void;
  onOpenPrivateKey: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  navigation: StackNavigationProp<BottomTabParamList>;
};

const RenderItem = ({
  item,
  showSetting,
  activeSlide,
  pressSwipe,
  swipe,
  setShowSetting,
  setWallet,
  onOpenPrivateKey,
  onOpenPhrase,
  refreshing,
  onRefresh,
  navigation
}: PropsRender) => {
  const toast = useToast();
  let wallet: Wallet = item.item;
  const [showModalDisconnect, setShowModalDisconnect] = useState(false);

  const itemWidth = Math.round(width * 0.85);

  const handleModalShowDisconnect = useCallback((param: boolean) => {
    setShowModalDisconnect(param);
  }, []);
  const sendBottomSheet = useDisclose();

  return (
    // TODO: Can change this to Refresh Control? (Pull to refresh to update token balances)
    <View
      style={{
        borderRadius: 10,
        borderWidth: 0.4,
        flex: 0.85,
        height: height / 1.65
      }}
    >
      {refreshing && <LoadingModal />}
      {showSetting && activeSlide === item.index && (
        <WalletSetting
          onOpenPrivateKey={() => {
            onOpenPrivateKey();
            setShowSetting(false);
          }}
          onPressPhrase={() => {
            onOpenPhrase();
            setShowSetting(false);
          }}
          setShowSetting={setShowSetting}
          onPressDisconnect={handleModalShowDisconnect}
        />
      )}
      {showModalDisconnect && activeSlide === item.index && (
        <DisconnectWallet
          handleSetWallet={() => {
            setWallet(wallet.walletAddress, true);
          }}
          onPressCancel={() => {
            setShowModalDisconnect(false);
          }}
        />
      )}
      <Pressable
        onPress={() => {
          // pressSwipe();
        }}
      >
        <ImageBackground
          source={require('../../../../assets/defaultWallet.png')}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          style={{
            width: itemWidth,
            height: itemWidth / 2.2,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0.4 }}
            end={{ x: 0, y: 1.1 }}
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            style={{ height: '100%', width: '100%', justifyContent: 'flex-end', padding: 8 }}
          >
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              <View width={'60%'}>
                <Text fontSize={17} fontWeight={'bold'} color={'white'}>
                  {wallet.walletName}
                </Text>
                <TouchableOpacity
                  style={{
                    padding: 1
                  }}
                  onPress={() => {
                    Clipboard.setString(wallet.walletAddress);
                    toast.show({
                      description: 'copy to clipboard'
                    });
                  }}
                >
                  <HStack space={0.5} alignItems={'center'}>
                    <Text
                      width={'80%'}
                      fontSize={10}
                      numberOfLines={1}
                      ellipsizeMode="middle"
                      color={'white'}
                    >
                      {wallet.walletAddress}
                    </Text>

                    <Image
                      source={require('../../../../assets/icon/copy.png')}
                      style={{
                        resizeMode: 'contain',
                        height: 20,
                        width: 20
                      }}
                    />
                  </HStack>
                </TouchableOpacity>
              </View>
              <View
                justifyContent={'flex-end'}
                alignItems={'flex-end'}
                flexDirection={'row'}
                width={'40%'}
              >
                <TouchableOpacity
                  onPress={() => {
                    pressSwipe();
                  }}
                >
                  <Image
                    source={require('../../../../assets/icon/swap.png')}
                    style={{
                      resizeMode: 'contain',
                      height: 20,
                      width: 20,
                      marginRight: 5
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowSetting(!showSetting);
                  }}
                >
                  <Image
                    source={require('../../../../assets/icon/setting.png')}
                    style={{
                      resizeMode: 'contain',
                      height: 20,
                      width: 20
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
      <View
        style={{
          padding: 15
        }}
        flex={0.82}
      >
        {swipe && activeSlide === item.index ? (
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={{
              paddingHorizontal: 1
            }}
          >
            {wallet.networks.map((network) =>
              network.tokens.map((token) => (
                <HStack key={token.tokenAddress} marginBottom={4}>
                  <Image
                    source={
                      token.logo
                        ? { uri: token.logo }
                        : require('../../../../assets/coins/default.png')
                    }
                    style={{
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      width: 35,
                      height: 35
                    }}
                  />
                  <View width={'39%'} ml={4}>
                    <Text numberOfLines={1} fontWeight={'bold'}>
                      {token.symbol}
                    </Text>
                    <Text numberOfLines={1} fontSize={12}>
                      ({token.name})
                    </Text>
                    <Text numberOfLines={1} fontSize={12} color={Colors.grayText}>
                      {network.name}
                    </Text>
                  </View>
                  <View width={'40%'} alignItems={'flex-end'} ml={'auto'}>
                    <Text numberOfLines={1} fontWeight={'bold'}>
                      {displayToken(token.balance, token.decimals)}
                    </Text>
                    <Text fontSize={12}>
                      IDR {(Number(token.balance) * token.idrPrice).toLocaleString('id-ID')}
                    </Text>
                  </View>
                </HStack>
              ))
            )}
          </ScrollView>
        ) : (
          <>
            <View flexDirection={'row'} alignItems={'center'}>
              <Text fontWeight={'bold'}>IDR</Text>
              <Text ml={5}>Balance</Text>
              <Image
                source={require('../../../../assets/icon/eyeBlack.png')}
                style={{
                  marginLeft: 3,
                  resizeMode: 'contain',
                  width: 18,
                  height: 18
                }}
              />
            </View>
            <Text fontSize={18} fontWeight={'bold'}>
              IDR {Number(wallet.idrAsset).toLocaleString('id-ID')}
            </Text>
          </>
        )}
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 0.2
        }}
      >
        {buttons.map((el) => (
          <TokenButton
            onPress={() => {
              if (el.name === 'Send') {
                sendBottomSheet.onOpen();
              } else if (el.name === 'Top Up') {
                navigation.navigate('WalletRouter', {
                  screen: 'TopUpScreen',
                  params: {
                    name: wallet.walletName,
                    address: wallet.walletAddress
                  }
                });
              }
            }}
            icon={el.icon}
            tes={wallet.walletName}
            key={el.name}
            name={el.name}
          />
        ))}
      </View>
      <SendBottomSheet
        name={wallet.walletName}
        isOpen={sendBottomSheet.isOpen}
        onClose={sendBottomSheet.onClose}
        address={wallet.walletAddress}
      />
    </View>
  );
};
