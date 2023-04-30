import { View, Text } from 'native-base';
import React, { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import { Colors } from '../../Colors';
import { useFocusEffect } from '@react-navigation/core';

type Props = {
  input: string & {};
  error: string | null;
};

const BoxCode = ({ input, error }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, [input])
  );
  return (
    <View
      borderWidth={0.4}
      bg={!loading && input && !error ? Colors.green : error ? 'red.600' : null}
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={8}
      width={Dimensions.get('screen').width / 8}
      height={Dimensions.get('screen').width / 8}
    >
      {input && (
        <Text fontWeight={'semibold'} fontSize={17} color={!loading && input ? 'white' : 'black'}>
          {loading ? input : '*'}
        </Text>
      )}
    </View>
  );
};

export default BoxCode;
