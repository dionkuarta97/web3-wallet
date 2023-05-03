import { Center, Text } from 'native-base';
import DefaultBody from '../../components/DefaultBody';
import { useAtom } from 'jotai';
import { walletReducer } from '../../state/wallet/walletReducer';

const AllWalletScreen = () => {
  const [wallet, disWallet] = useAtom(walletReducer);

  console.log(JSON.stringify(wallet.wallets, null, 2));

  return (
    <DefaultBody>
      <Center justifyContent={'center'} alignItems={'center'} flex={1}>
        <Text>All Wallet</Text>
      </Center>
    </DefaultBody>
  );
};

export default AllWalletScreen;
