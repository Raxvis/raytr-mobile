import React from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import tw from 'twrnc';

type Option = {
  label: string;
  value: string;
};

type DropdownSearchProps = {
  value?: string;
  onChange(string): void;
  options: Option[];
};

const DropdownSearch = ({ onChange, value = '', options = [] }: DropdownSearchProps) => {
  console.log(options);

  const renderItem = (item) => (
    <View className="flex flex-row items-center justify-between p-4">
      <Text className="flex text-[16px]">{item.label}</Text>
    </View>
  );

  return (
    <Dropdown
      style={tw`my-2 h-[50px] bg-white rounded p-3 shadow`}
      placeholderStyle={tw`text-[16px]`}
      selectedTextStyle={tw`text-[16px]`}
      inputSearchStyle={tw`h-[40px] text-[16px]`}
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
  );
};

export default DropdownSearch;
