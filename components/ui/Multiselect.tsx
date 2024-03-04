import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import tw from 'twrnc';
import classnames from 'classnames';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { validate } from 'uuid';

type Option = {
  label: string;
  value: string;
};

type MultiSelectSearchProps = {
  value?: string[];
  onChange(string): void;
  options: Option[];
  name?: string;
  classNames?: string;
};

const renderItem = (item) => (
  <View className="flex flex-row items-center justify-between p-4">
    <Text className="flex text-lg">{item.label}</Text>
  </View>
);

const MultiSelectSearch = ({ onChange, classNames, name, value = [], options = [] }: MultiSelectSearchProps) => {
  const [opt, setOpt] = useState(options);
  const addOption = useCallback(
    (text) => {
      if (text) {
        const newOption = { label: text, value: text };
        const valueOptions = value.filter((v) => !validate(v)).map((v) => ({ label: v, value: v }));
        setOpt([...options, ...valueOptions, newOption]);
      }
    },
    [options, value],
  );

  return (
    <View className={classnames('my-2 flex flex-grow space-y-2', classNames)}>
      {name ? <Text className="text-lg">{name}</Text> : null}
      <View>
        <MultiSelect
          data={opt}
          inputSearchStyle={tw`h-[48px] leading-5 text-lg`}
          labelField="label"
          maxHeight={300}
          onChange={onChange}
          onChangeText={addOption}
          placeholder="Select Category"
          placeholderStyle={tw`text-lg`}
          search
          searchPlaceholder="Search..."
          selectedTextStyle={tw`text-lg`}
          style={tw`h-[50px] bg-white rounded p-3 border border-gray-300`}
          value={value}
          valueField="value"
          renderItem={renderItem}
          alwaysRenderSelectedItem={true}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View className="my-2 mr-2 flex-row content-center items-center rounded border border-gray-300 bg-white p-2">
                <Text className="text-md">{item.label}</Text>
                <XMarkIcon size={22} color={'black'} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default MultiSelectSearch;
