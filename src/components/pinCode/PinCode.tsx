import { Center, HStack, Pressable, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Colors } from '../../Colors';
import BoxCode from './BoxCode';
import { width } from '../../Helpers';

type Props = {
  onChange: (val: any[]) => void;
  error?: string | null;
  onDel?: () => void;
};

const PinCode = ({ onChange, error = null, onDel = () => {} }: Props) => {
  const [box] = useState([1, 2, 3, 4]);
  const [number] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', null, '0', 'del']);
  const [input, setInput] = useState<any[]>([]);

  useEffect(() => {
    onChange(input);
  }, [input]);

  return (
    <View alignItems={'center'}>
      <HStack mt={8} space={3}>
        {box.map((el) => (
          <BoxCode error={error} key={el + 'boxcode'} input={input[el - 1]} />
        ))}
      </HStack>
      {error && (
        <Center mt={1}>
          <Text textAlign={'center'} color={'red.600'}>
            {error}
          </Text>
        </Center>
      )}

      <View paddingX={width / 10} marginTop={error ? width / 80 : width / 20}>
        <FlatGrid
          data={number}
          itemContainerStyle={{
            alignItems: 'center'
          }}
          scrollEnabled={false}
          style={{
            flexGrow: 0
          }}
          maxItemsPerRow={3}
          spacing={3}
          itemDimension={65}
          renderItem={({ item }) => (
            <Pressable
              key={item}
              disabled={input.length === 4 && item !== 'del' ? true : false}
              onPress={() => {
                if (item !== 'del') {
                  setInput((val) => [...val, item]);
                } else {
                  onDel();
                  input.pop();
                  setInput([...input]);
                }
              }}
            >
              {({ isPressed }) => {
                return (
                  <>
                    {item !== null && (
                      <View
                        marginTop={width / 16}
                        bg={
                          item !== 'del' && !isPressed
                            ? Colors.lightGray
                            : item !== 'del' && isPressed
                            ? Colors.neutral50
                            : null
                        }
                        style={{
                          transform: [
                            {
                              scale: isPressed ? 0.95 : 1
                            }
                          ]
                        }}
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRadius={60}
                        width={width / 6.5}
                        height={width / 6.5}
                      >
                        {item !== 'del' ? (
                          <Text fontSize={25}>{item}</Text>
                        ) : (
                          <Image
                            source={require('../../../assets/icon/delete.png')}
                            style={{
                              resizeMode: 'contain',
                              width: width / 10,
                              height: width / 10
                            }}
                          />
                        )}
                      </View>
                    )}
                  </>
                );
              }}
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default PinCode;
