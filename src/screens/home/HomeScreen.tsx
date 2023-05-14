import DefaultBody from '../../components/DefaultBody';
import { useAtom } from 'jotai';
import { bottomReducer } from '../../state/bottom/bottomReducer';
import HomeCarousel from './homeContent/HomeCarousel';
import { FlatGrid } from 'react-native-super-grid';
import { apps, services } from './homeContent/data';
import ServicePress from './homeContent/ServicePress';
import { HStack, Text } from 'native-base';
import { Colors } from '../../Colors';
import { ScrollView } from 'react-native';
import AppPress from './homeContent/AppPress';
import { useEffect } from 'react';
import { walletReducer } from '../../state/wallet/walletReducer';

const HomeScreen = () => {
  const [bottom, dispatch] = useAtom(bottomReducer);
  const [wallet, setWallet] = useAtom(walletReducer);

  return (
    <DefaultBody
      tapHandler={() => {
        if (bottom.showWallet) {
          dispatch({ type: 'setShowWallet', payload: false });
        }
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeCarousel />
        <Text mt={5} color={Colors.green} fontSize={18} fontWeight={'semibold'}>
          Services
        </Text>
        <FlatGrid
          data={services}
          itemContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 5
          }}
          maxItemsPerRow={4}
          spacing={8}
          scrollEnabled={false}
          style={{
            flexGrow: 0
          }}
          itemDimension={10}
          renderItem={({ item }) => <ServicePress logo={item.logo} name={item.name} />}
        />
        <HStack alignItems={'center'}>
          <Text color={Colors.green} fontSize={18} fontWeight={'semibold'}>
            D’apps
          </Text>
          <Text color={Colors.green} fontSize={14} marginLeft={'auto'}>
            Browse D’apps
          </Text>
        </HStack>
        <FlatGrid
          data={apps}
          itemContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5
          }}
          maxItemsPerRow={4}
          spacing={8}
          scrollEnabled={false}
          style={{
            flexGrow: 0,
            marginBottom: 100
          }}
          itemDimension={10}
          renderItem={({ item }) => <AppPress logo={item.logo} />}
        />
      </ScrollView>
    </DefaultBody>
  );
};

export default HomeScreen;
