import { Text, Center, View } from 'native-base';
import DefaultBody from '../../../components/DefaultBody';
import { useNavigation, useRoute } from '@react-navigation/core';
import { WalletParamList, WalletRouteProps } from '../../../navigations/WalletRouter';
import { height, width } from '../../../Helpers';
import { Colors } from '../../../Colors';
import { useState } from 'react';
import { Pressable, Image, TextInput, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

const SendWalletScreen = () => {
  const [network, setNetwork] = useState(null);
  const [showListNetwork, setShowListNetwork] = useState(false);
  const [toAddress, setToAddress] = useState(null);
  const route = useRoute<WalletRouteProps<'SendWalletScreen'>>();
  const navigation = useNavigation<StackNavigationProp<WalletParamList>>();
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
                  ? require('../../../../assets/coins/ethereum.png')
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
              {network ? network : 'Choose your network'}
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
                  editable={false}
                  placeholder="Search your network"
                  style={{
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
              <Pressable
                onPress={() => {
                  setNetwork('Ethereum');
                  setShowListNetwork(false);
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
                  source={require('../../../../assets/coins/ethereum.png')}
                  style={{
                    marginRight: 10,
                    width: 20,
                    height: 20,
                    resizeMode: 'contain'
                  }}
                />
                <Text>Ethereum</Text>
                {!network ? (
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
                    borderColor: Colors.grayText
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
                    paddingHorizontal: width / 10
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
                to: toAddress,
                network: network,
                valid: false
              }
            });
          }}
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
