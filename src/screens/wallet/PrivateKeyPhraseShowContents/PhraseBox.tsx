import { Text, View } from 'native-base';
import { Colors } from '../../../Colors';
import { width } from '../../../Helpers';

type Props = {
  no: number & {};
  text: string & {};
};

const PhraseBox = ({ no, text }: Props) => {
  return (
    <View
      style={{
        padding: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.greenGray,
        marginTop: 8,
        borderRadius: 10
      }}
    >
      <Text fontSize={width / 30} color={Colors.green}>
        {no}. {text}
      </Text>
    </View>
  );
};

export default PhraseBox;
