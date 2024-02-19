import { View, Text } from 'react-native';
import { Stack, useLocalSearchParams, useGlobalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import Dropdown from '../../components/ui/Dropdown';
import { useSelector } from 'react-redux';
import EditLayout from '../../components/layout/EditLayout';
import { RootState } from '../../store/configureStore';

const AddRating = () => {
  const params = useLocalSearchParams();
  const [categoryId, setCategoryId] = useState(undefined);
  const [itemId, setItemId] = useState(undefined);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { items } = useSelector((state: RootState) => state.items);

  const categoryOptions = useMemo(
    () =>
      categories.map(({ categoryId, categoryName }) => ({
        label: categoryName,
        value: categoryId,
      })),
    [categories],
  );
  const itemOptions = useMemo(
    () =>
      items.map(({ itemId, itemName }) => ({
        label: itemName,
        value: itemId,
      })),
    [items],
  );

  useEffect(() => {
    if (params.categoryId) {
      setCategoryId(params.categoryId);
    }
    if (params.itemId) {
      setItemId(params.itemId);
    }
  }, [params]);

  const schema = useMemo(
    () => categories.find((category) => category.categoryId === categoryId),
    [categoryId, categories],
  );

  return (
    <EditLayout>
      <Dropdown value={categoryId} onChange={setCategoryId} options={categoryOptions} />
      <Text>Don't see your Category? Add Category</Text>
      <Dropdown value={itemId} onChange={setItemId} options={itemOptions} />
      <Text>Don't see your Item? Add Item</Text>
    </EditLayout>
  );
};

export default AddRating;
