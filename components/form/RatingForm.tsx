import { View, Text } from 'react-native';
import { Link, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import Dropdown from '../../components/ui/Dropdown';
import EditLayout from '../../components/layout/EditLayout';
import Header from '../../components/ui/Header';
import { Rating, Score } from '../../types';
import Slider from '@react-native-community/slider';
import Button from '../../components/ui/Button';
import TextInput from '../../components/ui/TextInput';
import uuid from '../../utils/uuid';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import getAllCategories from '../../services/category/getAllCategories';
import getAllItems from '../../services/item/getAllItems';
import useAsyncCallback from '../../hooks/useAsyncCallback';
import upsertRating from '../../services/rating/upsertRating';
import getCategoryWithRatingSchema from '../../services/category/getCategoryWIthRatingSchema';
import deleteRating from '../../services/rating/deleteRating';
import createOptions from '../../utils/createOptions';

const find = (records, key, match) => (match ? records.find((record) => record[key] === match) : undefined);

type ItemFormProps = {
  edit?: boolean;
  initialState: Rating;
};

const RatingForm = ({ edit, initialState }: ItemFormProps) => {
  const params = useLocalSearchParams();
  const [rating, setRating] = useState<Rating>(initialState);
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

      if (rating.scores.length === 0) {
        const scores = category.ratingSchema.map(
          (schema): Score => ({
            scoreId: uuid(),
            ratingSchemaId: schema.ratingSchemaId,
            ratingId: rating.ratingId,
            scoreValue: 0,
            ratingSchema: schema,
          }),
        );

        setRating((r) => ({ ...r, scores }));
      }
    }
  }, [rating.categoryId, rating.scores]);

  useEffect(() => {
    if (rating.itemId && state.items) {
      const item = find(state.items, 'itemId', rating.itemId);

      if (item) {
        setRating((r) => ({ ...r, itemCost: item.itemCost }));
      }
    }
  }, [state.items, rating.itemId]);

  useEffect(() => {
    const { categoryId, itemId } = params;

    if (categoryId && !Array.isArray(categoryId)) {
      setRating((r) => ({ ...r, categoryId }));
    }
    if (itemId && !Array.isArray(itemId)) {
      setRating((r) => ({ ...r, itemId }));
    }
  }, [params.categoryId, params.itemId]);

  const updateRating = (key) => (value) => setRating((r) => ({ ...r, [key]: value }));
  const updateScore = (ratingSchemaId) => (value) =>
    setRating((r) => ({
      ...r,
      scores: r.scores.map((score) => ({
        ...score,
        ...(score.ratingSchemaId === ratingSchemaId ? { scoreValue: Math.round(value) } : {}),
      })),
    }));

  const [save, { loading: saving }] = useAsyncCallback(async () => {
    await upsertRating(rating);

    if (edit) {
      router.back();
    } else {
      router.replace(`/category/${rating.categoryId}/item/${rating.itemId}`);
    }
  }, [rating]);

  const [del, { loading: deleting }] = useAsyncCallback(async () => {
    await deleteRating(rating);

    router.back();
    // router.replace(`/category/${rating.categoryId}/item/${rating.itemId}`);
  }, [rating]);

  return (
    <EditLayout>
      <View className="flex flex-grow">
        <Header title="Add a Rating" />
        <View className="flex p-2">
          {edit ? null : (
            <>
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
                <Dropdown
                  value={rating.itemId}
                  name="Item"
                  onChange={updateRating('itemId')}
                  options={state.itemOptions}
                />
                <Text className="text-sm italic text-gray-600">
                  Don't see your Item?{' '}
                  <Link className="underline" href="/add/item">
                    Add a Item
                  </Link>
                </Text>
              </View>
            </>
          )}
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
                {rating?.scores.map((score: Score) => (
                  <View className="mt-2" key={score.scoreId}>
                    <View className="flex flex-row justify-between">
                      <Text className="text-lg">{score.ratingSchema.ratingSchemaName}</Text>
                      <Text className="">{score.scoreValue} Rating</Text>
                    </View>
                    <Slider
                      style={{}}
                      minimumValue={1}
                      maximumValue={10}
                      minimumTrackTintColor="#000000"
                      maximumTrackTintColor="#FFFFFF"
                      onValueChange={updateScore(score.ratingSchemaId)}
                      value={score.scoreValue}
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      </View>
      <View className="mt-8 flex space-x-2 p-2">
        {edit ? (
          <Button disabled={saving} onPress={save} text="Save Rating" />
        ) : (
          <Button disabled={saving} onPress={save} text="Add Rating" />
        )}
        {edit ? <Button disabled={deleting} color="red" onPress={del} text="Delete Rating" /> : null}
      </View>
    </EditLayout>
  );
};

export default RatingForm;
