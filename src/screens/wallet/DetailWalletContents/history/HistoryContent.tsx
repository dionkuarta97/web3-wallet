import { HStack, ScrollView, Text, View } from 'native-base';
import CardHistory from './historyComponnents/CardHistory';
import { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';

const data: { message: string; date: string }[] = [
  {
    message: 'You got IDR 10.000 from....',
    date: '15-02-2023 | 09.00'
  },
  {
    message: 'You got IDR 10.000 from....',
    date: '15-02-2023 | 09.00'
  },
  {
    message: 'Your Accout is Verified....',
    date: '15-02-2023 | 02.00'
  },
  {
    message: 'You got IDR 10.000 from....',
    date: '15-02-2023 | 09.00'
  },
  {
    message: 'You got IDR 10.000 from....',
    date: '15-02-2023 | 09.00'
  },
  {
    message: 'Your Accout is Verified....',
    date: '15-02-2023 | 02.00'
  },
  {
    message: 'You got IDR 10.000 from....',
    date: '15-02-2023 | 09.00'
  },
  {
    message: 'You got IDR 10.000 from....',
    date: '15-02-2023 | 09.00'
  },
  {
    message: 'Your Accout is Verified....',
    date: '15-02-2023 | 02.00'
  }
];

const HistoryContent = () => {
  const [refresh, setRefresh] = useState(false);
  const onRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }, []);

  return (
    <View p={2} flex={1}>
      <HStack>
        <Text>Mark all Read</Text>

        <Text ml={'auto'}>
          <Text fontWeight={'bold'}>Sort by</Text> : New
        </Text>
      </HStack>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        mt={6}
      >
        {data.map((el, idx) => (
          <CardHistory total={data.length} {...el} idx={idx} key={idx + 'card'} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HistoryContent;
