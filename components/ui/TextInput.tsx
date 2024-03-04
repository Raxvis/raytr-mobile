import React from 'react';
import { View, Text, TextInput } from 'react-native';
import classnames from 'classnames';
import type { KeyboardType } from 'react-native';

type TextInputProps = {
  classNames?: string;
  keyboardType?: KeyboardType;
  multiline?: boolean;
  name?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textInputClassNames?: string;
  value: string;
};

const TextInputField = ({
  classNames,
  keyboardType,
  multiline,
  name,
  onChange,
  placeholder,
  textInputClassNames,
  value,
}: TextInputProps) => {
  const textInputClassName = classnames(
    'bg-white rounded p-3 border border-gray-300 flex flex-row rounded p-2 justify-center items-top',
    multiline ? 'min-h-[100px] max-h-[300px]' : 'h-[50px]',
    textInputClassNames,
  );

  return (
    <View className={classnames('my-2 flex flex-grow space-y-2', classNames)}>
      {name ? <Text className="text-lg">{name}</Text> : null}
      <View className={textInputClassName}>
        <TextInput
          className="flex flex-grow text-lg leading-5"
          editable
          keyboardType={keyboardType}
          multiline={multiline}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

export default TextInputField;
