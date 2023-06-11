import { HStack, Text, VStack, View } from 'native-base';
import { Pressable } from 'react-native';
import { Colors } from '../../../../../Colors';
import { height, width } from '../../../../../Helpers';
import { useMemo, useState } from 'react';
import DefaultModal from '../../../../../components/modal/DefaultModal';

const CardHistory = ({
  message,
  date,
  idx,
  total
}: {
  total: number;
  message: string;
  date: string;
  idx: number;
}) => {
  const [showModal, setShowModal] = useState(false);
  const modal = useMemo(() => {
    return (
      <DefaultModal
        header={
          <View>
            <Text color={'white'} fontWeight={'bold'} fontSize={20}>
              Congratulation
            </Text>
          </View>
        }
        body={
          <View mt={4}>
            <Text
              mb={4}
              alignSelf={'center'}
              color={Colors.green}
              textAlign={'center'}
              fontWeight={'bold'}
              fontSize={19}
              width={width / 1.6}
            >
              Your Transfer is Successfully
            </Text>
            <VStack>
              <HStack alignItems={'center'}>
                <Text fontSize={18} color={Colors.green}>
                  From
                </Text>
                <Text fontSize={12} alignSelf={'flex-end'} color={Colors.green} ml={'auto'}>
                  Personal Wallet A
                </Text>
              </HStack>
              <HStack alignItems={'center'}>
                <Text fontSize={18} color={Colors.green}>
                  To
                </Text>
                <Text fontSize={12} alignSelf={'flex-end'} color={Colors.green} ml={'auto'}>
                  Bank BCA | 1273839039
                </Text>
              </HStack>
              <HStack alignItems={'center'}>
                <Text fontSize={18} color={Colors.green}>
                  Account Name
                </Text>
                <Text fontSize={12} alignSelf={'flex-end'} color={Colors.green} ml={'auto'}>
                  Joko Wijaya
                </Text>
              </HStack>
              <View width={'100%'} my={4} borderTopWidth={1} borderTopColor={Colors.green} />
              <HStack alignItems={'center'}>
                <Text fontSize={18} color={Colors.green}>
                  Amount
                </Text>
              </HStack>
              <HStack mt={4} alignItems={'center'}>
                <Text fontSize={18} color={Colors.green}>
                  Bitcoin
                </Text>
                <Text alignSelf={'flex-end'} color={Colors.green} ml={'auto'}>
                  0.01 BTC
                </Text>
              </HStack>
              <HStack alignItems={'center'}>
                <Text fontSize={18} color={Colors.green}>
                  Total
                </Text>
                <Text alignSelf={'flex-end'} color={Colors.green} ml={'auto'}>
                  0.01 BTC
                </Text>
              </HStack>
              <HStack justifyContent={'flex-end'} alignItems={'center'}>
                <Text fontSize={18} color={Colors.green}>
                  Rp 345.246.625
                </Text>
              </HStack>
            </VStack>
          </View>
        }
        footer={
          <Pressable
            onPress={() => {
              setShowModal(false);
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? Colors.lightGreen : Colors.green,
                width: width / 2,
                alignItems: 'center',
                paddingVertical: 10,
                borderRadius: 10
              }
            ]}
          >
            <Text color={'white'} fontWeight={'bold'}>
              Done
            </Text>
          </Pressable>
        }
      />
    );
  }, []);

  return (
    <>
      {showModal && modal}
      <Pressable
        onPress={() => {
          setShowModal(true);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? Colors.cardGrayLight : Colors.cardGray,
            marginBottom: idx + 1 === total ? height / 8 : 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 5
          }
        ]}
      >
        <Text fontSize={12}>{date}</Text>
        <Text fontWeight={'semibold'}>{message}</Text>
      </Pressable>
    </>
  );
};

export default CardHistory;
