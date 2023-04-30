import { Center, Text } from 'native-base';
import DefaultBody from '../../components/DefaultBody';

const CreateWalletScreen = () => {
  return (
    <DefaultBody>
      <Center justifyContent={'center'} alignItems={'center'} flex={1}>
        <Text>Create Wallet</Text>
      </Center>
    </DefaultBody>
  );
};

export default CreateWalletScreen;
