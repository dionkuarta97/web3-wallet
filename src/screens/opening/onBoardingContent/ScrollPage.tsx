import { Button, Text, View } from 'native-base';
import { height, width } from '../../../Helpers';
import { Colors } from '../../../Colors';
import { GradientBorderView } from '@good-react-native/gradient-border';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../../navigations/Root';

type Props = {
  title: string & {};
  desc: string & {};
  last: boolean & {};
};

const ScrollPage = ({ title, desc, last }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  return (
    <View width={width}>
      <View>
        <Text width={width * 0.7} fontSize={35} fontWeight={'bold'} color={Colors.grayText085}>
          {title}
        </Text>
      </View>
      <View mt={5} width={width * 0.7}>
        <Text color={Colors.grayText075}>{desc}</Text>
        {last && (
          <Button
            onPress={() => navigation.replace('AuthRouter', { screen: 'OpeningScreen' })}
            borderRadius={18}
            alignSelf={'center'}
            marginTop={height / 20}
            bg={'rgba(4, 38, 38, 0)'}
            _pressed={{
              bg: 'rgba(4, 38, 38, 1)'
            }}
            width={width * 0.5}
            padding={0}
          >
            <GradientBorderView
              gradientProps={{
                colors: ['rgba(254, 83, 187, 0.75)', 'rgba(9, 251, 211, 0.75)'],
                start: { x: 0.0, y: 0.1 },
                end: { x: 0.1, y: 2.5 }
              }}
              style={{
                borderRadius: 12,
                borderWidth: 1,
                width: width * 0.5,
                alignItems: 'center',
                padding: 5
              }}
            >
              <Text color={'white'}>Get Started</Text>
            </GradientBorderView>
          </Button>
        )}
      </View>
    </View>
  );
};

export default ScrollPage;
