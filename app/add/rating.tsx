import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Stack, useLocalSearchParams, useGlobalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import Dropdown from '../../components/ui/Dropdown';
import { useSelector } from 'react-redux';
import EditLayout from '../../components/layout/EditLayout';
import { RootState } from '../../store/configureStore';
import TextInput from '../../components/ui/TextInput';
import Header from '../../components/ui/Header';

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

  const [name, setName] = useState('');

  return (
    <EditLayout>
      <Header title="Add a Rating" />
      <Text className="text-lg">Category</Text>
      <Dropdown value={categoryId} onChange={setCategoryId} options={categoryOptions} />
      <Text className="text-sm italic text-gray-600">
        Don't see your Category?{' '}
        <Link className="underline" href="/add/category">
          Add a Category
        </Link>
      </Text>
      <Text className="text-lg">Item</Text>
      <Dropdown value={itemId} onChange={setItemId} options={itemOptions} />
      <Text className="text-sm italic text-gray-600">
        Don't see your Item?{' '}
        <Link className="underline" href="/add/item">
          Add a Item
        </Link>
      </Text>
      {/* <TextInput name="Name" onChange={setName} value={name} /> */}
    </EditLayout>
  );
};

export default AddRating;
