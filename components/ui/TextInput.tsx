import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import classnames from 'classnames';
import type { KeyboardType } from 'react-native';

type TextInputProps = {
  classNames?: string;
  name?: string;
  onChange: (value: string) => void;
  value: string;
  multiline?: boolean;
  keyboardType?: KeyboardType;
};

const TextInputField = ({ classNames, onChange, name, multiline, value, keyboardType }: TextInputProps) => {
  const buttonClassName = classnames(
    'h-auto flex flex-row rounded border border-gray-800 p-2 justify-center items-top',
    multiline ? 'min-h-[100px] max-h-[300px]' : '',
  );

  return (
    <View className={classnames('my-2 flex flex-grow space-y-2', classNames)}>
      {name ? <Text className="text-lg">{name}</Text> : null}
      <View className={buttonClassName}>
        <TextInput
          className="flex flex-grow"
          editable
          keyboardType={keyboardType}
          multiline={multiline}
          onChangeText={onChange}
          value={value}
        />
      </View>
    </View>
  );
};

export default TextInputField;
