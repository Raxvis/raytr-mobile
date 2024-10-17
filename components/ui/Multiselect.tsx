import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import tw from 'twrnc';
import classnames from 'classnames';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { validate } from 'uuid';
import uuid from '../../utils/uuid';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import useAsyncCallback from '../../hooks/useAsyncCallback';
import getAllCategories from '../../services/category/getAllCategories';
import createOptions from '../../utils/createOptions';

type Option = {
  label: string;
  value: string;
};

type MultiSelectSearchProps = {
  value?: string[];
  onChange(string): void;
  name?: string;
  classNames?: string;
  loadOptions: () => Promise<Option[]>;
  createOption: (value: string, label: string) => Promise<Option>;
};

const renderItem = (item) => (
  <View className="flex flex-row items-center justify-between p-4">
    <Text className="flex text-lg">{item.label}</Text>
  </View>
);

const MultiSelectSearch = ({
  onChange,
  classNames,
  name,
  value,
  loadOptions,
  createOption,
}: MultiSelectSearchProps) => {
  const [opt, setOpt] = useState([]);

  useAsyncEffect(async () => {
    const options = await loadOptions();
    setOpt(options);
  }, []);

  const addOption = useCallback(
    (text) => {
      if (text) {
        setOpt([...opt, { label: text, value: text }]);
      }
    },
    [value],
  );

  const [onLocalChange] = useAsyncCallback(async (values) => {
    const storedValues = values.filter(validate);
    const newValues = values.filter((v) => !validate(v));

    for (const v of newValues) {
      const id = uuid();
      const newOption = await createOption(id, v);

      storedValues.push(id);

      const options = await loadOptions();
      setOpt(options);
    }

    onChange(storedValues);
  }, []);

  return (
    <View className={classnames('my-2 flex flex-grow space-y-2', classNames)}>
      {name ? <Text className="text-lg">{name}</Text> : null}
      <View>
        <MultiSelect
          data={opt}
          inputSearchStyle={tw`h-[48px] leading-5 text-lg`}
          labelField="label"
          maxHeight={300}
          onChange={onLocalChange}
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
