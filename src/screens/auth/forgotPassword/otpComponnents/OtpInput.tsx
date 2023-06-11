import { TextInput } from 'react-native';
import { height, width } from '../../../../Helpers';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Colors } from '../../../../Colors';
import { color } from 'native-base/lib/typescript/theme/styled-system';

type Props = {
  refInput: MutableRefObject<TextInput>;
  onChange: (val: string) => void;
  onDelete?: () => void;
  value: string;
  onFull: () => void;
};
const OtpInput = ({ refInput, onChange, onDelete = () => {}, value, onFull }: Props) => {
  return (
    <TextInput
      maxLength={1}
      ref={refInput}
      onKeyPress={({ nativeEvent }) => {
        if (nativeEvent.key === 'Backspace') {
          onDelete();
        }
        if (value) {
          onFull();
        }
      }}
      value={value}
      keyboardType="numeric"
      onChangeText={(val) => {
        onChange(val);
      }}
      secureTextEntry={true}
      textAlign="center"
      style={{
        width: width / 10,
        height: height / 20,
        borderRadius: 8,
        borderWidth: 0.8,
        backgroundColor: value ? Colors.green : 'white',
        color: 'white'
      }}
    />
  );
};

export default OtpInput;
