import { Dimensions, TextInput, Text, Image } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'native-base';
import { Colors } from '../../../Colors';
import { formatEmail, height, width } from '../../../Helpers';
type Props = {
  isDisable?: boolean;
  validate?: boolean;
  onChange: (val: string) => void;
};
const InputEmail = ({ onChange, isDisable = false, validate = true }: Props) => {
  const [foccus, setFoccus] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState('');

  const handleEmail = useCallback((val: string) => {
    setEmail(val);
    onChange(val);
  }, []);

  const handleSetFocus = useCallback((val: boolean) => {
    setFoccus(val);
  }, []);
  const handleSetError = useCallback((val: boolean) => {
    setShowError(val);
  }, []);

  useEffect(() => {
    if (email !== null) {
      if (formatEmail(email)) {
        setShowError(false);
      } else {
        setShowError(true);
      }
    }
  }, [email]);

  return (
    <View>
      <View justifyContent={'center'}>
        <TextInput
          onFocus={() => {
            handleSetFocus(true);
            if (email === null) {
              handleEmail('');
            }
          }}
          value={email}
          editable={isDisable ? false : true}
          onBlur={() => handleSetFocus(false)}
          inputMode="email"
          autoComplete="email"
          onChangeText={(val) => handleEmail(val)}
          autoCapitalize="none"
          placeholder="Enter your email"
          style={{
            borderColor: !foccus ? Colors.grayText : 'black',
            borderRadius: 6,
            borderWidth: 0.8,
            paddingLeft: Dimensions.get('screen').width * 0.13,
            height: height / 18
          }}
        />
        <Image
          style={{ height: 25, width: 25, left: width * 0.03, position: 'absolute' }}
          source={
            !foccus
              ? require('../../../../assets/icon/sms.png')
              : require('../../../../assets/icon/smsBlack.png')
          }
        />
      </View>
      <Text style={{ color: 'red', fontSize: 13, marginTop: 2 }}>
        {showError && validate && email !== '' && 'is not email !!'}
      </Text>
    </View>
  );
};

export default InputEmail;
