import { View, Text } from 'react-native';
import { Link, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Dropdown from '../../components/ui/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import EditLayout from '../../components/layout/EditLayout';
import { RootState } from '../../store/configureStore';
import Header from '../../components/ui/Header';
import { Rating, RatingSchema, Score } from '../../types';
import Slider from '@react-native-community/slider';
import Button from '../../components/ui/Button';
import TextInput from '../../components/ui/TextInput';
import uuid from '../../utils/uuid';
import { addRating } from '../../store/ratings';

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
  ratingTime: new Date(),
});

const AddRating = () => {
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const [rating, setRating] = useState<Rating>(getNewRating());
  const [scores, setScores] = useState({});

  const { categories } = useSelector((state: RootState) => state.categories);
  const { items } = useSelector((state: RootState) => state.items);

  const categoryOptions = useMemo(() => createOptions(categories, 'categoryName', 'categoryId'), [categories]);
  const itemOptions = useMemo(() => createOptions(items, 'itemName', 'itemId'), [items]);

  const category = useMemo(() => find(categories, 'categoryId', rating.categoryId), [categories, rating.categoryId]);
  const item = useMemo(() => find(items, 'itemId', rating.itemId), [items, rating.itemId]);

  useEffect(() => {
    if (params.categoryId || params.itemId) {
      setRating((r) => ({ ...r, ...params }));
    }
  }, [params]);

  const updateRating = (key) => (value) => setRating((r) => ({ ...r, [key]: value }));
  const updateScores = (key) => (value) => setScores((s) => ({ ...s, [key]: Math.round(value) }));

  const saveRating = useCallback(() => {
    const parsedScores = Object.keys(scores).map(
      (ratingSchemaId): Score => ({ ratingSchemaId, scoreValue: scores[ratingSchemaId] }),
    );
    const ratingTotal = parsedScores.reduce((result, score) => result + score.scoreValue, 0) / parsedScores.length;

    dispatch(
      addRating({
        ...rating,
        ratingTotal: Math.round(ratingTotal * 100) / 100,
        scores: parsedScores,
      }),
    );
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
              options={categoryOptions}
            />
            <Text className="text-sm italic text-gray-600">
              Don't see your Category?{' '}
              <Link className="underline" href="/add/category">
                Add a Category
              </Link>
            </Text>
          </View>
          <View className="mb-2">
            <Dropdown value={rating.itemId} name="Item" onChange={updateRating('itemId')} options={itemOptions} />
            <Text className="text-sm italic text-gray-600">
              Don't see your Item?{' '}
              <Link className="underline" href="/add/item">
                Add a Item
              </Link>
            </Text>
          </View>
          {rating.categoryId && rating.itemId ? (
            <View className="">
              <TextInput
                name="Item Cost"
                onChange={updateRating('itemCost')}
                value={rating?.itemCost || item?.itemCost}
              />
              <TextInput
                name="Rating Notes"
                multiline
                onChange={updateRating('ratingNotes')}
                value={rating?.ratingNotes}
              />
              <View className="">
                {category.ratingSchema.map((schema: RatingSchema) => (
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
