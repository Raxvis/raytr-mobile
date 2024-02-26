import React from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import tw from 'twrnc';
import classnames from 'classnames';

type Option = {
  label: string;
  value: string;
};

type DropdownSearchProps = {
  value?: string;
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

const DropdownSearch = ({ onChange, classNames, name, value = '', options = [] }: DropdownSearchProps) => (
  <View className={classnames('my-2 flex flex-grow space-y-2', classNames)}>
    {name ? <Text className="text-lg">{name}</Text> : null}
    <View>
      <Dropdown
        style={tw`h-[50px] bg-white rounded p-3 border border-gray-300`}
        placeholderStyle={tw`text-lg`}
        selectedTextStyle={tw`text-lg`}
        inputSearchStyle={tw`h-[48px] leading-5 text-lg`}
        data={options}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => onChange(item.value)}
        renderItem={renderItem}
      />
    </View>
  </View>
);

export default DropdownSearch;
