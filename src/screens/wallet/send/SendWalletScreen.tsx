import { Text, Center, View } from 'native-base';
import DefaultBody from '../../../components/DefaultBody';
import { useNavigation, useRoute } from '@react-navigation/core';
import { WalletParamList, WalletRouteProps } from '../../../navigations/WalletRouter';
import { height, width } from '../../../Helpers';
import { Colors } from '../../../Colors';
import { useEffect, useState } from 'react';
import { Pressable, Image, TextInput, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getNetworks, Network as TNetwork } from '../../../api/networks';
import { useAtom } from 'jotai';
import { SendCryptoTxStatus, sendCryptoStateAtom } from '../../../state/send-crypto';
import { walletByAddressAtom } from '../../../state/wallet/walletReducer';
import { TokenType } from '../../../api/tokens';


const Network = ({
  onSetNetwork,
  network,
  isSelected,
}: {
  onSetNetwork: (network: TNetwork) => void;
  network: TNetwork;
  isSelected: boolean;
}) => {
  return (
    <Pressable
      onPress={() => {
        onSetNetwork(network);
      }}
      style={({ pressed }) => [
        {
          transform: [
            {
              scale: pressed ? 0.99 : 1
            }
          ],
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10
        }
      ]}
    >
      <Image
        source={network.logoUrl
          ? { uri: network.logoUrl }
          : require('../../../../assets/coins/default.png')}
        style={{
          marginRight: 10,
          width: 20,
          height: 20,
          resizeMode: 'contain'
        }}
      />
      <Text>{network.name}</Text>
      {!isSelected ? (
        <View
          style={{
            borderRadius: 60,
            width: 20,
            height: 20,
            borderColor: Colors.neutral25,
            borderWidth: 1,
            marginLeft: 'auto'
          }}
        />
      ) : (
        <Image
          source={require('../../../../assets/icon/checkFull.png')}
          style={{
            marginLeft: 'auto',
            width: 20,
            height: 20,
            resizeMode: 'contain'
          }}
        />
      )}
    </Pressable>
  )
}

const SendWalletScreen = () => {
  const [network, setNetwork] = useState<TNetwork | null>(null);
  const [showListNetwork, setShowListNetwork] = useState(false);
  const [networkList, setNetworkList] = useState<TNetwork[]>([]);
  const [toAddress, setToAddress] = useState(null);
  const route = useRoute<WalletRouteProps<'SendWalletScreen'>>();
  const navigation = useNavigation<StackNavigationProp<WalletParamList>>();
  const [walletByAddress, setWalletByAddress] = useAtom(walletByAddressAtom);
  const [sendCryptoState, setSendCryptoState] = useAtom(sendCryptoStateAtom);

  useEffect(() => {
    (async () => {
      const networks = await getNetworks({ isTestNet: true });
      setNetworkList(networks);
      setWalletByAddress(route.params.address);
    })()
  }, [])
  
  useEffect(() => {
    setSendCryptoState({
      ...sendCryptoState,
      senderWallet: walletByAddress,
    })
  }, [walletByAddress])

  useEffect(() => {
    setSendCryptoState({
      ...sendCryptoState,
      destinationWallet: {
        address: toAddress,
      }
    })
  }, [toAddress])

  const onSetNetwork = (network: TNetwork) => {
    setNetwork(network);

    const networkFeeToken = walletByAddress.networks
      .find(n => n.slug === network.slug)?.tokens
      .find(t => t.tokenType === TokenType.NATIVE);

    setSendCryptoState({
      ...sendCryptoState,
      network: network,
      networkFeeToken,
    })
  }

  return (
    <DefaultBody>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View flex={1}>
          <Center>
            <Text fontSize={width / 20} fontWeight={'bold'} color={Colors.green}>
              Send To Wallet
            </Text>
            <View
              style={{
                borderTopWidth: 4,
                width: width / 2.2,
                borderRadius: 15,
                marginTop: 3,
                borderTopColor: Colors.green
              }}
            />
          </Center>
          <Text mt={8} ml={2} mb={1}>
            Network
          </Text>
          <Pressable
            onPress={() => {
              setShowListNetwork(!showListNetwork);
            }}
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 15,

              borderRadius: 8,
              borderColor: network ? 'black' : Colors.neutral25
            }}
          >
            <Image
              source={
                network
                  ? { uri: network.logoUrl }
                  : require('../../../../assets/icon/coin.png')
              }
              style={{
                width: 20,
                height: 20,
                marginRight: 10,
                resizeMode: 'contain'
              }}
            />
            <Text color={network ? 'black' : Colors.grayText}>
              {network ? network.name : 'Choose your network'}
            </Text>
            <Image
              source={
                network && !showListNetwork
                  ? require('../../../../assets/icon/arrow-down-black.png')
                  : network && showListNetwork
                  ? require('../../../../assets/icon/arrow-up-black.png')
                  : !network && showListNetwork
                  ? require('../../../../assets/icon/arrow-up.png')
                  : require('../../../../assets/icon/arrow-down.png')
              }
              style={{
                marginLeft: 'auto',
                width: 20,
                height: 20,
                resizeMode: 'contain'
              }}
            />
          </Pressable>
          {showListNetwork && (
            <View
              style={{
                marginTop: height / 40,
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 5,
                borderRadius: 8,
                borderColor: Colors.neutral25
              }}
            >
              <View padding={2} mb={3} justifyContent={'center'}>
                <TextInput
                  placeholder="Search your network"
                  style={{
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: Colors.neutral25,
                    paddingLeft: width / 10
                  }}
                />
                <Image
                  source={require('../../../../assets/icon/search-gray.png')}
                  style={{
                    width: 20,
                    height: 20,
                    left: width / 20,
                    resizeMode: 'contain',
                    position: 'absolute'
                  }}
                />
              </View>
              {networkList.map((n) => (
                <Network
                  key={n.slug}
                  network={n}
                  isSelected={n.slug === network?.slug}
                  onSetNetwork={onSetNetwork}
                />
              )
              )}
            </View>
          )}
          {network && !showListNetwork && (
            <>
              <Text ml={2} mt={8} mb={1}>
                From
              </Text>
              <View justifyContent={'center'}>
                <TextInput
                  editable={false}
                  value={route.params?.name}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: width / 10,
                    borderColor: Colors.grayText,
                    height: 40
                  }}
                />
                <Image
                  source={require('../../../../assets/icon/walletGray.png')}
                  style={{
                    resizeMode: 'contain',
                    width: 25,
                    height: 25,
                    marginLeft: 10,
                    position: 'absolute'
                  }}
                />
              </View>
              <Text ml={2} mt={8} mb={1}>
                To (Wallet Address)
              </Text>
              <View justifyContent={'center'}>
                <TextInput
                  value={toAddress}
                  placeholder="Wallet Address"
                  onChangeText={(val) => {
                    setToAddress(val);
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: width / 10,
                    height: 40
                  }}
                />
                <Image
                  source={require('../../../../assets/icon/wallet.png')}
                  style={{
                    resizeMode: 'contain',
                    width: 25,
                    height: 25,
                    marginLeft: 10,
                    position: 'absolute'
                  }}
                />
              </View>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View flex={0.3} paddingX={10}>
        <Pressable
          onPress={() => {
            navigation.navigate('WalletAmountScreen', {
              data: {
                from: route.params.name,
                fromAddress: route.params.address,
                to: toAddress,
                network: network ? network.slug : '',
                valid: false
              }
            });
          }}
          disabled={!network}
          style={({ pressed }) => [
            {
              alignItems: 'center',
              backgroundColor: !toAddress
                ? Colors.neutral50
                : pressed
                ? Colors.lightGreen
                : Colors.green,
              paddingVertical: 15,
              borderRadius: 10
            }
          ]}
        >
          <Text fontWeight={'semibold'} color="white">
            Continue
          </Text>
        </Pressable>
      </View>
    </DefaultBody>
  );
};

export default SendWalletScreen;
