import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Stack, useLocalSearchParams, useGlobalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Dropdown from '../../components/ui/Dropdown';
import { useSelector } from 'react-redux';
import EditLayout from '../../components/layout/EditLayout';
import { RootState } from '../../store/configureStore';
import Header from '../../components/ui/Header';
import { Rating, RatingSchema, Score } from '../../types';
import Slider from '@react-native-community/slider';
import Button from '../../components/ui/Button';
import TextInput from '../../components/ui/TextInput';

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

  const item = useMemo(() => (itemId ? items.find((item) => itemId === item.itemId) : undefined), [items, itemId]);
  const category = useMemo(
    () => (categoryId ? categories.find((category) => categoryId === category.categoryId) : undefined),
    [categories, categoryId],
  );
  const ratingSchema = useMemo(() => (category ? category.ratingSchema : undefined), [category]);

  const [rating, setRating] = useState({});
  const updateRating = useCallback(
    (ratingSchemaId, value) => {
      setRating({ ...rating, [ratingSchemaId]: Math.floor(value) });
    },
    [rating],
  );

  const saveRating = useCallback(() => {
    const newRating: Rating = {
      categoryId,
      itemCost: 0,
      ratingTotal: 0,
      ratingNotes: '',
      ratingTime: new Date(),
      scores: Object.keys(rating).map(
        (ratingSchemaId): Score => ({ ratingSchemaId, scoreValue: rating[ratingSchemaId] }),
      ),
    };
    // TODO - let's save
    console.log(rating);
  }, [rating]);

  return (
    <EditLayout>
      <View className="flex flex-grow">
        <Header title="Add a Rating" />
        <View className="flex p-2">
          <View className="mb-2">
            <Dropdown value={categoryId} name="Category" onChange={setCategoryId} options={categoryOptions} />
            <Text className="text-sm italic text-gray-600">
              Don't see your Category?{' '}
              <Link className="underline" href="/add/category">
                Add a Category
              </Link>
            </Text>
          </View>
          <View className="mb-2">
            <Dropdown value={itemId} name="Item" onChange={setItemId} options={itemOptions} />
            <Text className="text-sm italic text-gray-600">
              Don't see your Item?{' '}
              <Link className="underline" href="/add/item">
                Add a Item
              </Link>
            </Text>
          </View>
          {categoryId && itemId ? (
            <View className="">
              <TextInput name="Item Cost" value={`${item?.itemCost}`} />
              <TextInput name="Rating Notes" multiline value={``} />
              <View className="">
                {ratingSchema.map((schema: RatingSchema) => (
                  <View className="mt-2" key={schema.ratingSchemaId}>
                    <View className="flex flex-row justify-between">
                      <Text className="text-lg">{schema.ratingSchemaName}</Text>
                      <Text className="">{rating[schema.ratingSchemaId]} Rating</Text>
                    </View>
                    <Slider
                      style={{}}
                      minimumValue={1}
                      maximumValue={10}
                      minimumTrackTintColor="#000000"
                      maximumTrackTintColor="#FFFFFF"
                      onValueChange={(value) => updateRating(schema.ratingSchemaId, value)}
                      value={rating[schema.ratingSchemaId]}
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      </View>
      <View className="flex p-2">
        <Button onPress={saveRating} text="Save Rating" />
      </View>
    </EditLayout>
  );
};

export default AddRating;
