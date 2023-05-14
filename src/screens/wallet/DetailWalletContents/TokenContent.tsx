import { HStack, Text, View, useToast } from 'native-base';
import React, { useCallback, useState } from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { width } from '../../../Helpers';
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

type Props = {
  activeSlide: number;
  setActiveSlide: (val: number) => void;
  setShowSetting: (val: boolean) => void;
  showSetting: boolean;
};

const buttons: { name: string; icon: ImageSourcePropType }[] = [
  { name: 'Send', icon: Send },
  { name: 'Receive', icon: Receive },
  { name: 'Top Up', icon: Topup }
];

const TokenContent = ({ showSetting, activeSlide, setActiveSlide, setShowSetting }: Props) => {
  const [wallet, setWallet] = useAtom(walletReducer);
  const itemWidth = Math.round(width * 0.85);
  const [swipe, setSwipe] = useState(false);
  const [showModalSuccessDisconnect, setShowModalSuccessDisconnect] = useState(false);
  const pressSwipe = useCallback(() => {
    setSwipe(!swipe);
  }, [swipe]);

  const swipeOnSnap = useCallback(() => {
    setSwipe(false);
  }, []);

  const handleSetWallet = useCallback((param: string, val: boolean) => {
    let temp = wallet.wallets.filter((val) => val.walletAddress !== param);
    setWallet({ type: 'setWallets', payload: temp });
    setShowModalSuccessDisconnect(val);
  }, []);

  const handlePressDoneDisconnect = useCallback((param: boolean) => {
    setShowModalSuccessDisconnect(param);
  }, []);

  return (
    <View style={{ marginTop: 15, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {showModalSuccessDisconnect && (
        <ModalSuccessDisconnect
          tapHandler={() => {
            handlePressDoneDisconnect(false);
          }}
          onPressDone={() => {
            handlePressDoneDisconnect(false);
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
            item={item}
            showSetting={showSetting}
            activeSlide={activeSlide}
            pressSwipe={pressSwipe}
            swipe={swipe}
            setShowSetting={setShowSetting}
            setWallet={handleSetWallet}
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
};

const RenderItem = ({
  item,
  showSetting,
  activeSlide,
  pressSwipe,
  swipe,
  setShowSetting,
  setWallet
}: PropsRender) => {
  const toast = useToast();
  let wallet: Wallet = item.item;
  const [showModalDisconnect, setShowModalDisconnect] = useState(false);
  const itemWidth = Math.round(width * 0.85);

  const handleModalShowDisconnect = useCallback((param: boolean) => {
    setShowModalDisconnect(param);
  }, []);

  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 0.4,
        flex: 0.85
      }}
    >
      {showSetting && activeSlide === item.index && (
        <WalletSetting
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
          tapHandler={() => handleModalShowDisconnect(false)}
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
            onStartShouldSetResponder={() => true}
            style={{
              paddingHorizontal: 16
            }}
          >
            <View alignItems={'center'}>
              <Text>Don't see your token?</Text>
            </View>
            {wallet.networks.map(
              (el, idx) =>
                Number(el.balance) > 0 && (
                  <HStack key={el.slug} marginTop={idx > 0 ? 0 : 4} marginBottom={4}>
                    <Image
                      source={
                        el.slug === 'ethereum'
                          ? require('../../../../assets/coins/ethereum.png')
                          : el.slug === 'polygon'
                          ? require('../../../../assets/coins/polygon.png')
                          : el.slug === 'bsc'
                          ? require('../../../../assets/coins/binance-smart-chain.png')
                          : el.slug === 'arbitrum'
                          ? require('../../../../assets/coins/arbitrum.png')
                          : el.slug === 'avalanche'
                          ? require('../../../../assets/coins/avalanche.png')
                          : el.slug === 'fantom'
                          ? require('../../../../assets/coins/fantom.png')
                          : el.slug === 'cronos'
                          ? require('../../../../assets/coins/cronos.png')
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
                        {el.symbol}
                      </Text>
                      <Text numberOfLines={1} fontSize={12}>
                        ({el.name})
                      </Text>
                      <Text numberOfLines={1} fontSize={12} color={Colors.grayText}>
                        {el.networkName}
                      </Text>
                    </View>
                    <View width={'40%'} alignItems={'flex-end'} ml={'auto'}>
                      <Text numberOfLines={1} fontWeight={'bold'}>
                        {Number(el.balance).toFixed(8)}
                      </Text>
                      <Text fontSize={12}>
                        IDR {(Number(el.balance) * el.idrPrice).toLocaleString('id-ID')}
                      </Text>
                    </View>
                  </HStack>
                )
            )}
            {wallet.networks.map((el) =>
              el.tokens.map((item) => (
                <HStack key={item.token_address} marginBottom={4}>
                  <Image
                    source={
                      item.logo
                        ? { uri: item.logo }
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
                      {item.symbol}
                    </Text>
                    <Text numberOfLines={1} fontSize={12}>
                      ({item.name})
                    </Text>
                    <Text numberOfLines={1} fontSize={12} color={Colors.grayText}>
                      {el.networkName}
                    </Text>
                  </View>
                  <View width={'40%'} alignItems={'flex-end'} ml={'auto'}>
                    <Text numberOfLines={1} fontWeight={'bold'}>
                      {Number(item.balance).toFixed(8)}
                    </Text>
                    <Text fontSize={12}>
                      IDR {(Number(item.balance) * item.idrPrice).toLocaleString('id-ID')}
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
          flex: 0.3
        }}
      >
        {buttons.map((el) => (
          <TokenButton icon={el.icon} tes={wallet.walletName} key={el.name} name={el.name} />
        ))}
      </View>
    </View>
  );
};
