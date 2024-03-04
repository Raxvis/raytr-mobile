import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import Dropdown from '../../components/ui/Dropdown';
import EditLayout from '../../components/layout/EditLayout';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import getAllItems from '../../services/item/getAllItems';

const createOptions = (records, labelKey, valueKey) =>
  records.map((record) => ({
    label: record[labelKey],
    value: record[valueKey],
  }));

const AddStart = () => {
  const [itemId, setItemId] = useState();
  const [state, setState] = useState({
    itemOptions: [],
    items: [],
  });

  useAsyncEffect(async () => {
    const items = await getAllItems();
    const itemOptions = createOptions(items, 'itemName', 'itemId');

    setState((s) => ({ ...s, items, itemOptions }));
  }, []);

  const next = useCallback(() => {
    if (itemId) {
      router.navigate(`/add/${itemId}`);
    }
  }, [itemId]);

  return (
    <EditLayout>
      <View className="flex flex-grow">
        <Header title="Add a Rating" />
        <View className="flex p-2">
          <View className="mb-2">
            <Dropdown value={itemId} onChange={setItemId} options={state.itemOptions} />
            <View className="my-4">
              <Text className="text-center text-sm italic text-gray-600">Don't see your Item?</Text>
            </View>
            <Button onPress={() => router.navigate(`/add/item`)} text="Add Item" />
          </View>
        </View>
      </View>
      <View className="mt-8 flex space-x-2 p-2">
        <Button onPress={next} text="Next" />
      </View>
    </EditLayout>
  );
};

export default AddStart;
