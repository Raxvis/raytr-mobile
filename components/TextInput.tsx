import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import classnames from 'classnames';

type TextInputProps = {
  name?: string;
  onChange: (value: string) => void;
  value: string;
  multiline?: boolean;
};

const TextInputField = ({ onChange, name, multiline, value }: TextInputProps) => {
  const className = classnames(
    'h-auto flex flex-row rounded border border-gray-800 p-2  justify-center items-top',
    multiline ? 'min-h-[100px] max-h-[300px]' : '',
  );

  return (
    <KeyboardAvoidingView>
      <View className="my-2 space-y-2">
        {name ? <Text className="text-lg">{name}</Text> : null}
        <View className={className}>
          <TextInput className="flex flex-grow" editable multiline={multiline} onChangeText={onChange} value={value} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TextInputField;
