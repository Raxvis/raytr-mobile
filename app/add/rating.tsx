import { View, Text } from 'react-native';
import { Link, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import Dropdown from '../../components/ui/Dropdown';
import EditLayout from '../../components/layout/EditLayout';
import Header from '../../components/ui/Header';
import { Rating, RatingSchema, Score } from '../../types';
import Slider from '@react-native-community/slider';
import Button from '../../components/ui/Button';
import TextInput from '../../components/ui/TextInput';
import uuid from '../../utils/uuid';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import getAllCategories from '../../services/category/getAllCategories';
import getAllItems from '../../services/item/getAllItems';
import useAsyncCallback from '../../hooks/useAsyncCallback';
import addRating from '../../services/rating/addRating';
import useAsyncMemo from '../../hooks/useAsyncMemo';
import getCategoryWithRatingSchema from '../../services/category/getCategoryWIthRatingSchema';

const createOptions = (records, labelKey, valueKey) =>
  records.map((record) => ({
    label: record[labelKey],
    value: record[valueKey],
  }));

const find = (records, key, match) => (match ? records.find((record) => record[key] === match) : undefined);

const getNewRating = (): Rating => ({
  ratingId: uuid(),
  itemId: '',
  categoryId: '',
  ratingTime: Date.now(),
});

const AddRating = () => {
  const params = useLocalSearchParams();
  const [rating, setRating] = useState<Rating>(getNewRating());
  const [scores, setScores] = useState({});
  const [state, setState] = useState({
    categories: [],
    category: undefined,
    categoryOptions: [],
    item: undefined,
    itemOptions: [],
    items: [],
  });

  useAsyncEffect(async () => {
    const categories = await getAllCategories();
    const items = await getAllItems();
    const categoryOptions = createOptions(categories, 'categoryName', 'categoryId');
    const itemOptions = createOptions(items, 'itemName', 'itemId');

    setState((s) => ({ ...s, categories, items, categoryOptions, itemOptions }));
  }, []);

  useAsyncEffect(async () => {
    if (rating.categoryId) {
      const category = await getCategoryWithRatingSchema(rating.categoryId);

      setState((s) => ({ ...s, category }));
    }
  }, [rating.categoryId]);

  useEffect(() => {
    if (rating.itemId && state.items) {
      const item = find(state.items, 'itemId', rating.itemId);

      if (item) {
        setRating((r) => ({ ...r, itemCost: item.itemCost }));
      }
    }
  }, [state.items, rating.itemId]);

  useEffect(() => {
    console.log('updating params');
    const { categoryId, itemId } = params;

    if (categoryId && !Array.isArray(categoryId)) {
      setRating((r) => ({ ...r, categoryId }));
    }
    if (itemId && !Array.isArray(itemId)) {
      setRating((r) => ({ ...r, itemId }));
    }
  }, [params.categoryId, params.itemId]);

  const updateRating = (key) => (value) => setRating((r) => ({ ...r, [key]: value }));
  const updateScores = (key) => (value) => setScores((s) => ({ ...s, [key]: Math.round(value) }));

  const [saveRating] = useAsyncCallback(async () => {
    try {
      await addRating(rating, scores);
    } catch (error) {
      console.log(error);
      console.log(JSON.stringify(error));
    }

    router.replace(`/category/${rating.categoryId}/item/${rating.itemId}`);
  }, [rating, scores]);

  return (
    <EditLayout>
      <View className="flex flex-grow">
        <Header title="Add a Rating" />
        <View className="flex p-2">
          <View className="mb-2">
            <Dropdown
              value={rating.categoryId}
              name="Category"
              onChange={updateRating('categoryId')}
              options={state.categoryOptions}
            />
            <Text className="text-sm italic text-gray-600">
              Don't see your Category?{' '}
              <Link className="underline" href="/add/category">
                Add a Category
              </Link>
            </Text>
          </View>
          <View className="mb-2">
            <Dropdown value={rating.itemId} name="Item" onChange={updateRating('itemId')} options={state.itemOptions} />
            <Text className="text-sm italic text-gray-600">
              Don't see your Item?{' '}
              <Link className="underline" href="/add/item">
                Add a Item
              </Link>
            </Text>
          </View>
          {rating.categoryId && rating.itemId ? (
            <View className="">
              <TextInput name="Item Cost" onChange={updateRating('itemCost')} value={`${rating?.itemCost}`} />
              <TextInput
                name="Rating Notes"
                multiline
                onChange={updateRating('ratingNotes')}
                value={rating?.ratingNotes}
              />
              <View className="">
                {state.category?.ratingSchema.map((schema: RatingSchema) => (
                  <View className="mt-2" key={schema.ratingSchemaId}>
                    <View className="flex flex-row justify-between">
                      <Text className="text-lg">{schema.ratingSchemaName}</Text>
                      <Text className="">{scores?.[schema.ratingSchemaId]} Rating</Text>
                    </View>
                    <Slider
                      style={{}}
                      minimumValue={1}
                      maximumValue={10}
                      minimumTrackTintColor="#000000"
                      maximumTrackTintColor="#FFFFFF"
                      onValueChange={updateScores(schema.ratingSchemaId)}
                      value={scores?.[schema.ratingSchemaId]}
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
