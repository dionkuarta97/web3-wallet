import { Text, Center, View, VStack, ScrollView, HStack, Divider, Spinner } from 'native-base';
import DefaultBody from '../../../components/DefaultBody';
import { Colors } from '../../../Colors';
import { displayToken, height, logJsonPretty, width } from '../../../Helpers';
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
import { SendCryptoTxStatus, readWriteSendCryptoTransactionHistoryAtom, sendCryptoStateAtom, sendCryptoTransactionByTxHashAtom, updateSendCryptoTransactionByTxHashAtom } from '../../../state/send-crypto';
import { TextEllipsis } from 'neka-simple-utilities';
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'

const WalletAmountScreen = () => {
  const [choose, setChoose] = useState<TokenType | null>(null);
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [amount, setAmount] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [total, setTotal] = useState('0');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoadingProcessingTx, setIsLoadingProcessingTx] = useState(false);
  const [show, setShow] = useState(false);
  const route = useRoute<WalletRouteProps<'WalletAmountScreen'>>();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const [transactionStep, setTransactionStep] = useState<'CONFIRMATION' | 'PROCESSING' | 'DELIVERY'>('CONFIRMATION');
  const [sendCryptoState, setSendCryptoState] = useAtom(sendCryptoStateAtom);
  const [sendCryptoTxByHash, setSendCryptoTxByHash] = useAtom(sendCryptoTransactionByTxHashAtom);
  const [, appendSendCryptoTxHistory] = useAtom(readWriteSendCryptoTransactionHistoryAtom);
  const [, updateSendCryptoTx] = useAtom(updateSendCryptoTransactionByTxHashAtom);
  const [, clearSendCryptoTxByHash] = useAtom(sendCryptoTransactionByTxHashAtom);
  const {
    network,
    senderWallet,
    networkFee,
    networkFeeToken,
    destinationWallet,
    token,
    evmFeeData
  } = sendCryptoState;

  useEffect(() => {
    const tokens = senderWallet.networks.find(n => n.slug === network.slug)?.tokens;
    setTokens(tokens);
  }, [])

  // Update Network Fees and other Fee Data
  useEffect(() => {
    if (!amount || Number(amount) == 0) {
      setSendCryptoState({
        ...sendCryptoState,
        networkFee: '0',
      })
      return
    }
    // TODO: Network fee should be refreshed after a period of time
    (async () => {
      const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
      const value = amount;
      const gasPaymentToken = tokens.find(t => t.tokenType === TokenTypeEnum.NATIVE);

      if (choose.tokenType == TokenTypeEnum.NATIVE) {
        const tx = {
          to: destinationWallet.address,
          data: '0x',
          value
        }
        const feeData = await provider.getFeeData();
        const estimatedGas = await provider.estimateGas(tx);
        const _networkFee = estimatedGas.mul(feeData.gasPrice);

        setSendCryptoState({
          ...sendCryptoState,
          amount,
          networkFeeToken: gasPaymentToken,
          networkFee: _networkFee.toString(),
          evmFeeData: {
            ...feeData,
            estimatedGas,
          }
        });
      }

      if (choose.tokenType == TokenTypeEnum.ERC20) {
        const erc20Abi = [
          "function transfer(address to, uint amount)"
        ]
        const contract = new ethers.Contract(choose.tokenAddress, erc20Abi, provider);
        const feeData = await provider.getFeeData();
        const fromWallet = new ethers.Wallet(senderWallet.walletPrivateKey, provider);
        const estimatedGas = await contract.connect(fromWallet).estimateGas.transfer(destinationWallet.address, value);
        const _networkFee = estimatedGas.mul(feeData.gasPrice);

        setSendCryptoState({
          ...sendCryptoState,
          amount,
          networkFeeToken: gasPaymentToken,
          networkFee: _networkFee.toString(),
          evmFeeData: {
            ...feeData,
            estimatedGas,
          }
        });
      }
    })()
  }, [amount])

  // Update Total
  useEffect(() => {
    if (!amount || Number(amount) == 0) {
      setTotal('0');
      return
    }
    if (choose.tokenType == TokenTypeEnum.NATIVE) {
      const total = ethers.BigNumber.from(amount).add(networkFee).toString();
      setTotal(total);
    } else {
      setTotal(amount);
    }
  }, [amount, networkFee])

  // Handle Done Button on Modal
  const handleDonePress = () => {
    if (!sendCryptoTxByHash) {
      submitSendTransaction();
      return;
    }
    clearSendCryptoTxByHash(sendCryptoTxByHash.txHash);
    navigation.replace('BottomTabRouter', {
      screen: 'HomeRouter',
      params: {
        screen: 'HomeScreen'
      }
    });
  }
  
  // Submit Send Transaction
  const submitSendTransaction = async () => {
    setIsLoadingProcessingTx(true);
    
    const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
    const wallet = new ethers.Wallet(senderWallet.walletPrivateKey, provider);
    if (token.tokenType == TokenTypeEnum.NATIVE) {
      const tx = {
        from: senderWallet.walletAddress,
        to: destinationWallet.address,
        value: amount,
        gasLimit: evmFeeData.estimatedGas.mul(150).div(100),
        gasPrice: evmFeeData.gasPrice,
      }
      logJsonPretty(tx);
      const trx = await wallet.sendTransaction(tx);
      setSendCryptoState({
        ...sendCryptoState,
        txHash: trx.hash,
      })
      appendSendCryptoTxHistory({
        createdAt: new Date(),
        updatedAt: new Date(),
        txHash: trx.hash,
        status: SendCryptoTxStatus.PROCESSING
      })
      setSendCryptoTxByHash(trx.hash);
    }
    setIsLoadingProcessingTx(false)
  }

  const selectToken = async (token: TokenType) => {
    setChoose(token);
    setSendCryptoState({
      ...sendCryptoState,
      token
    })
  }

  // Check Transaction Status periodically
  useEffect(() => {
    if (!sendCryptoTxByHash) return;
    const intervalId = setInterval(async () => {
      console.log('hello')
      const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
      const receipt = await provider.getTransactionReceipt(sendCryptoTxByHash.txHash);
      console.log({ receipt })
      if (!receipt) { return }
      updateSendCryptoTx({
        ...sendCryptoTxByHash,
        status: SendCryptoTxStatus.SUCCESS,
      })
      // TODO: Need to find a better way to update sendCryptoTxByHash
      // updateSendCryptoTx will not update sendCryptoTxByHash
      // but it should
      // Need to call this function otherwise 
      // sendCryptoTxByHash will not be updated
      setSendCryptoTxByHash(sendCryptoTxByHash.txHash);
    }, 3000)

    return () => clearInterval(intervalId);
  }, [sendCryptoTxByHash])

  // Update Transaction Steps
  useDeepCompareEffectNoCheck(() => {
    if (!sendCryptoTxByHash) return;
    if (sendCryptoTxByHash.status === SendCryptoTxStatus.PROCESSING) {
      setTransactionStep('PROCESSING');
      return;
    }
    if (sendCryptoTxByHash.status === SendCryptoTxStatus.SUCCESS) {
      setTransactionStep('DELIVERY');
      return;
    }
  }, [sendCryptoTxByHash])

  return (
    <DefaultBody>
      {route.params.data.valid && (
        <DefaultModal
          header={
            <View>
              <Text color={'white'} fontWeight={'bold'} fontSize={20}>
                {transactionStep === 'CONFIRMATION' && 'Congratulation'}
                {transactionStep === 'PROCESSING' && 'Processing'}
                {transactionStep === 'DELIVERY' && 'Delivery'}
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
                        backgroundColor: (transactionStep === 'CONFIRMATION' ? Colors.green : Colors.neutral50),
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
                      backgroundColor: (transactionStep === 'PROCESSING' ? Colors.green : Colors.neutral50),
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
                      backgroundColor: (transactionStep === 'DELIVERY' ? Colors.green : Colors.neutral50),
                      borderRadius: 50
                    }}
                  />
                </HStack>
                <HStack mt={1}>
                  <Text fontSize={11} color={Colors.green}>
                    Confirmation
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
                    Processing
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
                      {choose?.symbol} {displayToken(total, choose.decimals, 8)}
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
                      {TextEllipsis({ position: 'middle', text: destinationWallet.address, length: 6 })}
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
                    {choose?.symbol} {choose ? displayToken(total, choose.decimals, 18) : 0}
                  </Text>
                </HStack>
                <HStack mt={1}>
                  <Text fontWeight={'semibold'}>Network Fee</Text>
                  <Text ml={'auto'} numberOfLines={1} fontWeight={'semibold'}>
                    {networkFeeToken?.symbol} {choose ? displayToken(networkFee, networkFeeToken.decimals, 10) : 0}
                  </Text>
                </HStack>
                <View width={'100%'} my={2} borderTopWidth={1} />
                <HStack mt={1}>
                  <Text fontWeight={'semibold'}>Total Payment</Text>
                  <Text ml={'auto'} numberOfLines={1} fontWeight={'semibold'}>
                    {choose?.symbol} {choose ? displayToken(total, choose.decimals, 18) : 0}
                  </Text>
                </HStack>
                {choose?.tokenType === TokenTypeEnum.ERC20 && networkFeeToken && (
                  <HStack>
                    <Text fontWeight={'bold'} ml={'auto'}>
                      {networkFeeToken?.symbol} {choose ? displayToken(networkFee, networkFeeToken.decimals, 10) : 0}
                    </Text>
                  </HStack>
                )}
              </View>
            </View>
          }
          footer={
            <Pressable
              onPress={handleDonePress}
              disabled={isLoadingProcessingTx}
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
                {isLoadingProcessingTx ? (<Spinner color={Colors.white} />) : 'Done' }
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
            logo={token?.logo}
            onTap={selectToken}
            value={token ? token.name : 'Choose'}
          />
          <VStack width={'45%'} ml={'auto'}>
            <Text fontSize={13} color={Colors.grayText}>
              Your Balance
            </Text>
            <Text numberOfLines={1} fontWeight={'semibold'}>
              {token ? token.symbol + ' ' + displayToken(token.balance, token.decimals) : 0}
            </Text>
          </VStack>
        </View>
        <Text mt={8} ml={2} mb={1}>
          Amount
        </Text>
        <View justifyContent={'center'}>
          <TextInput
            value={inputAmount}
            editable={choose ? true : false}
            keyboardType="numeric"
            placeholder="Input your amount"
            onChangeText={(val) => {
              setInputAmount(val);
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
                {sendCryptoState.networkFeeToken && (
                  <Text ml={'auto'}>
                    {sendCryptoState.networkFeeToken.symbol + ' '}
                    {displayToken(
                        sendCryptoState.networkFee,
                        sendCryptoState.networkFeeToken.decimals,
                        18
                      )
                    }
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
              {choose?.symbol} {choose ? displayToken(total, choose.decimals, 18) : 0}
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
