import { Text, Center, View, VStack, ScrollView, HStack, Divider } from 'native-base';
import DefaultBody from '../../../components/DefaultBody';
import { Colors } from '../../../Colors';
import { displayToken, height, width } from '../../../Helpers';
import TokenTap from './walletAmountComponents/TokenTap';
import { useEffect, useState } from 'react';
import Wallet from '../../../../assets/icon/wallet.png';
import WalletGray from '../../../../assets/icon/walletGray.png';
import { TextInput } from 'react-native-gesture-handler';
import { Image, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { WalletRouteProps } from '../../../navigations/WalletRouter';
import { RootParamList } from '../../../navigations/Root';
import { StackNavigationProp } from '@react-navigation/stack';
import DefaultModal from '../../../components/modal/DefaultModal';
import { useAtom } from 'jotai';
import { walletReducer } from '../../../state/wallet/walletReducer';
import { TokenType } from '../../../state/wallet/walletTypes';
import { ethers } from 'ethers';
import { getNetworkBySlug } from '../../../api/networks';
import { TokenType as TokenTypeEnum } from '../../../api/tokens';

const WalletAmountScreen = () => {
  const [choose, setChoose] = useState<TokenType | null>(null);
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [amount, setAmount] = useState('');
  const [networkFee, setNetworkFee] = useState('0');
  const [networkFeeToken, setNetworkFeeToken] = useState<TokenType | null>(null);
  const [total, setTotal] = useState('0');
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(false);
  const route = useRoute<WalletRouteProps<'WalletAmountScreen'>>();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const [wallet] = useAtom(walletReducer);

  useEffect(() => {
    (async () => {
      const { data } = route.params;
      const { from, fromAddress, to, network: networkSlug } = data;
      const senderWallet = wallet.wallets.find(w => w.walletAddress.toLowerCase() === fromAddress.toLowerCase());
      const sourceNetwork = senderWallet.networks.find(n => n.slug === networkSlug);
      const tokens = sourceNetwork.tokens;
      setTokens(tokens);
    })()
  }, [])

  useEffect(() => {
    if (!amount || Number(amount) == 0) {
      setNetworkFee('0');
      return
    }
    // TODO: Network fee should be refreshed after a period of time
    (async () => {
      const { data } = route.params;
      const { from, fromAddress, to, network: networkSlug } = data;
      const senderWallet = wallet.wallets.find(w => w.walletAddress.toLowerCase() === fromAddress.toLowerCase());
      const sourceNetwork = senderWallet.networks.find(n => n.slug === networkSlug);
      const networkConfig = await getNetworkBySlug(networkSlug);
      const provider = new ethers.providers.JsonRpcProvider(networkConfig.rpcUrl);
      const tokens = sourceNetwork.tokens;
      const gasPaymentToken = tokens.find(t => t.tokenType === TokenTypeEnum.NATIVE);
      const value = amount;

      setNetworkFeeToken(gasPaymentToken);

      if (choose.tokenType == TokenTypeEnum.NATIVE) {
        const tx = {
          to: to,
          data: '0x',
          value
        }
        const feeData = await provider.getFeeData();
        const estimatedGas = await provider.estimateGas(tx);
        const networkFee = estimatedGas.mul(feeData.gasPrice);
        setNetworkFee(networkFee.toString());
      }

      if (choose.tokenType == TokenTypeEnum.ERC20) {
        const erc20Abi = [
          "function transfer(address to, uint amount)"
        ]
        const contract = new ethers.Contract(choose.tokenAddress, erc20Abi, provider);
        const feeData = await provider.getFeeData();
        const fromWallet = new ethers.Wallet(senderWallet.walletPrivateKey, provider);
        const estimatedGas = await contract.connect(fromWallet).estimateGas.transfer(to, value);
        const networkFee = estimatedGas.mul(feeData.gasPrice);
        setNetworkFee(networkFee.toString());
      }
    })()
  }, [amount])

  useEffect(() => {
    if (!amount || Number(amount) == 0) {
      setTotal('0');
      return
    }
    if (choose.tokenType == TokenTypeEnum.NATIVE) {
      const parsedAmount = ethers.utils.parseUnits(amount, choose.decimals);
      const total = ethers.BigNumber.from(parsedAmount).add(networkFee).toString();
      setTotal(total);
    } else {
      setTotal(amount);
    }
  }, [amount, networkFee])

  return (
    <DefaultBody>
      {route.params.data.valid && (
        <DefaultModal
          header={
            <View>
              <Text color={'white'} fontWeight={'bold'} fontSize={20}>
                Congratulation
              </Text>
            </View>
          }
          body={
            <View mt={height / 30}>
              <Center>
                <Text fontSize={18} fontWeight={'bold'} color={Colors.green}>
                  Detail
                </Text>
                <HStack mt={2}>
                  <View>
                    <View
                      style={{
                        width: 15,
                        height: 15,
                        backgroundColor: Colors.green,
                        borderRadius: 50
                      }}
                    />
                  </View>
                  <View
                    style={{
                      borderTopWidth: 3,
                      alignSelf: 'center',
                      width: width / 8,
                      borderColor: Colors.neutral50
                    }}
                  />
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: Colors.neutral50,
                      borderRadius: 50
                    }}
                  />
                  <View
                    style={{
                      borderTopWidth: 3,
                      alignSelf: 'center',
                      width: width / 8,
                      borderColor: Colors.neutral50
                    }}
                  />
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: Colors.neutral50,
                      borderRadius: 50
                    }}
                  />
                </HStack>
                <HStack mt={1}>
                  <Text fontSize={11} color={Colors.green}>
                    Confirmed
                  </Text>
                  <View
                    style={{
                      borderTopWidth: 3,
                      alignSelf: 'center',
                      width: width / 12,
                      borderColor: Colors.neutral50,
                      opacity: 0
                    }}
                  />
                  <Text fontSize={11} color={Colors.grayText}>
                    Ready
                  </Text>
                  <View
                    style={{
                      borderTopWidth: 3,
                      alignSelf: 'center',
                      width: width / 12,
                      borderColor: Colors.neutral50,
                      opacity: 0
                    }}
                  />
                  <Text fontSize={11} color={Colors.grayText}>
                    Delivery
                  </Text>
                </HStack>
              </Center>
              <View px={6}>
                <HStack mt={4}>
                  <VStack>
                    <Text color={Colors.grayText}>Order ID</Text>
                    <Text fontWeight={'semibold'}>2901</Text>
                  </VStack>
                  <VStack alignItems={'flex-end'} ml={'auto'}>
                    <Text color={Colors.grayText}>Date</Text>
                    <Text fontWeight={'semibold'}>18.45 | 23-03-23</Text>
                  </VStack>
                </HStack>
                <HStack mt={2}>
                  <VStack>
                    <Text color={Colors.grayText}>Transaction Detail</Text>
                    <Text fontWeight={'semibold'}>Sent {choose?.name}</Text>
                  </VStack>
                  <VStack alignItems={'flex-end'} ml={'auto'}>
                    <Text color={Colors.grayText}>Amount</Text>
                    <Text numberOfLines={1} fontWeight={'semibold'}>
                      {choose?.symbol} {choose?.balance}
                    </Text>
                  </VStack>
                </HStack>
                <HStack mt={2}>
                  <VStack>
                    <Text color={Colors.grayText}>From</Text>
                    <Text fontWeight={'semibold'}>{route.params?.data.from}</Text>
                  </VStack>
                  <VStack alignItems={'flex-end'} ml={'auto'}>
                    <Text color={Colors.grayText}>To</Text>
                    <Text numberOfLines={1} fontWeight={'semibold'}>
                      {route.params?.data.to}
                    </Text>
                  </VStack>
                </HStack>
                <Text mt={4} color={Colors.grayText}>
                  Payment
                </Text>
                <HStack mt={2}>
                  <Text fontWeight={'semibold'}>Total Price</Text>
                  <Text ml={'auto'} numberOfLines={1} fontWeight={'semibold'}>
                    {/* IDR {choose ? (choose.idrPrice * amount).toLocaleString('id-ID') : 0} */}
                  </Text>
                </HStack>
                <HStack mt={1}>
                  <Text fontWeight={'semibold'}>NetWork Fee</Text>
                  <Text ml={'auto'} numberOfLines={1} fontWeight={'semibold'}>
                    {networkFee}
                  </Text>
                </HStack>
                <View width={'100%'} my={2} borderTopWidth={1} />
                <HStack mt={1}>
                  <Text fontWeight={'semibold'}>Total Payment</Text>
                  <Text ml={'auto'} numberOfLines={1} fontWeight={'semibold'}>
                    {/* IDR {choose ? (amount * choose.idrPrice + 500500).toLocaleString('id-ID') : 0} */}
                  </Text>
                </HStack>
              </View>
            </View>
          }
          footer={
            <Pressable
              onPress={() => {
                navigation.replace('BottomTabRouter', {
                  screen: 'HomeRouter',
                  params: {
                    screen: 'HomeScreen'
                  }
                });
              }}
              style={({ pressed }) => [
                {
                  width: width / 2,
                  alignSelf: 'center',
                  alignItems: 'center',
                  backgroundColor: pressed ? Colors.lightGreen : Colors.green,
                  paddingVertical: 15,
                  borderRadius: 10
                }
              ]}
            >
              <Text fontWeight={'semibold'} color="white">
                Done
              </Text>
            </Pressable>
          }
        />
      )}

      <ScrollView showsVerticalScrollIndicator={false} flex={1}>
        <Center>
          <Text fontSize={width / 20} fontWeight={'bold'} color={Colors.green}>
            Send To Wallet
          </Text>
          <Divider backgroundColor={Colors.green} width={width / 2.2} thickness={5} borderRadius={15} />
        </Center>
        <Text mt={8} ml={2} mb={1}>
          Token
        </Text>
        <View alignItems={'center'} flexDirection={'row'}>
          <TokenTap
            tokens={tokens}
            logo={choose?.logo}
            onTap={(val) => {
              setChoose(val);
              setAmount(null);
            }}
            value={choose ? choose.name : 'Choose'}
          />
          <VStack width={'45%'} ml={'auto'}>
            <Text fontSize={13} color={Colors.grayText}>
              Your Balance
            </Text>
            <Text numberOfLines={1} fontWeight={'semibold'}>
              {choose ? choose.symbol + ' ' + displayToken(choose.balance, choose.decimals) : 0}
            </Text>
          </VStack>
        </View>
        <Text mt={8} ml={2} mb={1}>
          Amount
        </Text>
        <View justifyContent={'center'}>
          <TextInput
            value={amount ? displayToken(amount, choose?.decimals) : ''}
            editable={choose ? true : false}
            keyboardType="numeric"
            placeholder="Input your amount"
            onChangeText={(val) => {
              if (!val) {
                setAmount('');
                return;
              }
              setAmount(
                ethers.utils.parseUnits(val, choose?.decimals).toString()
              );
            }}
            style={{
              borderRadius: 6,
              borderWidth: 1,
              paddingLeft: width * 0.13,
              borderColor: amount ? 'black' : Colors.neutral50,
              height: 40,
            }}
          />
          <Image
            source={amount ? Wallet : WalletGray}
            style={{ height: 25, width: 25, left: width * 0.03, position: 'absolute' }}
          />
        </View>
        <Pressable
          onPress={() => setShow(!show)}
          style={({}) => [
            {
              borderWidth: 1,
              marginTop: height / 20,
              padding: 10,
              borderColor: Colors.grayText,
              borderRadius: 10
            }
          ]}
        >
          <Text color={Colors.grayText}>Detail</Text>
          <HStack
            space={1}
            style={{
              alignItems: 'center',
              position: 'absolute',
              top: -12,
              zIndex: 1,
              backgroundColor: 'white',
              right: 30,
              paddingHorizontal: 10
            }}
          >
            <Text fontSize={12} color={Colors.grayText}>
              Fee Include
            </Text>
            <Image
              source={
                !show
                  ? require('../../../../assets/icon/arrow-up.png')
                  : require('../../../../assets/icon/arrow-down.png')
              }
              style={{
                resizeMode: 'contain',
                height: 15,
                width: 15
              }}
            />
          </HStack>
          <HStack mt={4}>
            <Text>From : </Text>
            <Text fontWeight={'semibold'}>{route.params.data.from}</Text>
          </HStack>
          <HStack mt={1}>
            <Text>To : </Text>
            <Text numberOfLines={1} fontWeight={'semibold'}>
              {route.params.data.to}
            </Text>
          </HStack>
          <HStack mt={1}>
            <Text>Network : </Text>
            <Text fontWeight={'semibold'}>{route.params.data.network}</Text>
          </HStack>
          {show && (
            <>
              <View
                width={'100%'}
                my={4}
                borderColor={Colors.grayText}
                borderStyle={'dashed'}
                borderTopWidth={1}
              />
              <HStack>
                <Text>Token</Text>
                <Text ml={'auto'}>
                  {choose?.symbol} {amount ? displayToken(amount, choose.decimals) : 0}</Text>
              </HStack>
              <HStack mt={2}>
                <Text>Network Fee</Text>
                {networkFeeToken && (
                  <Text ml={'auto'}>
                    {networkFeeToken.symbol} {displayToken(networkFee, networkFeeToken.decimals, 18)}
                  </Text>
                )}
              </HStack>
            </>
          )}
          <View
            width={'100%'}
            my={4}
            borderColor={Colors.grayText}
            borderStyle={'dashed'}
            borderTopWidth={1}
          />
          <HStack>
            <Text fontWeight={'bold'}>Total Payment</Text>
            <Text fontWeight={'bold'} ml={'auto'}>
              {choose?.symbol} {choose ? displayToken(total, choose.decimals) : 0}
            </Text>
          </HStack>
          {choose?.tokenType === TokenTypeEnum.ERC20 && networkFeeToken && (
            <HStack>
              <Text fontWeight={'bold'} ml={'auto'}>
                {networkFeeToken?.symbol} {choose ? displayToken(networkFee, networkFeeToken.decimals, 18) : 0}
              </Text>
            </HStack>
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('AuthRouter', {
              screen: 'InputPinScreen',
              params: { data: { ...route.params.data, amount: amount } }
            });
          }}
          style={({ pressed }) => [
            {
              width: width / 1.5,
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: !amount
                ? Colors.neutral50
                : pressed
                ? Colors.lightGreen
                : Colors.green,
              paddingVertical: 15,
              borderRadius: 10,
              marginBottom: height / 5,
              marginTop: 30
            }
          ]}
        >
          <Text fontWeight={'semibold'} color="white">
            Send
          </Text>
        </Pressable>
      </ScrollView>
    </DefaultBody>
  );
};

export default WalletAmountScreen;
