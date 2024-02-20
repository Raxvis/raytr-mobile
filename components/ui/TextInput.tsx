import React from 'react';
import { View, Text, TextInput } from 'react-native';
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
  const textInputClassName = classnames(
    'bg-white rounded p-3 shadow flex flex-row rounded p-2 justify-center items-top',
    multiline ? 'min-h-[100px] max-h-[300px]' : 'h-[50px]',
  );

  return (
    <View className={classnames('my-2 flex flex-grow space-y-2', classNames)}>
      {name ? <Text className="text-lg">{name}</Text> : null}
      <View className={textInputClassName}>
        <TextInput
          className="flex flex-grow text-[16px]"
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
