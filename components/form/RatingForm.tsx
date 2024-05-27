import { View, Text } from 'react-native';
import { Link, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import Dropdown from '../../components/ui/Dropdown';
import EditLayout from '../../components/layout/EditLayout';
import Header from '../../components/ui/Header';
import { Item, Rating, Score } from '../../types';
import Slider from '@react-native-community/slider';
import Button from '../../components/ui/Button';
import TextInput from '../../components/ui/TextInput';
import uuid from '../../utils/uuid';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import useAsyncCallback from '../../hooks/useAsyncCallback';
import upsertRating from '../../services/rating/upsertRating';
import getCategoryWithRatingMetric from '../../services/category/getCategoryWIthRatingMetric';
import deleteRating from '../../services/rating/deleteRating';
import getItem from '../../services/item/getItem';
import getItemRatings from '../../services/item/getItemMetrics';

const find = (records, key, match) => (match ? records.find((record) => record[key] === match) : undefined);

type ItemFormProps = {
  edit?: boolean;
  initialState: Rating;
};

const RatingForm = ({ edit, initialState }: ItemFormProps) => {
  const params = useLocalSearchParams();
  const [rating, setRating] = useState<Rating>(initialState);
  const [state, setState] = useState({
    item: undefined,
    ratingMetrics: [],
  });

  useAsyncEffect(async () => {
    // Get schema for item
    const ratingMetrics = await getItemRatings(initialState.itemId);
    const item = await getItem<Item>(initialState.itemId);

    // console.log(JSON.stringify(ratingMetrics, null, 2));

    if (item) {
      setRating((r) => ({ ...r, itemCost: item.itemCost }));
      setState((s) => ({ ...s, item, ratingMetrics }));
    }

    setRating((r) => ({
      ...r,
      scores: ratingMetrics.map((ratingMetric) => ({
        ratingId: r.ratingId,
        scoreId: uuid(),
        ratingMetricId: ratingMetric.ratingMetricId,
        ratingMetric: ratingMetric,
      })),
    }));
  }, [initialState]);

  const updateRating = (key) => (value) => setRating((r) => ({ ...r, [key]: value }));
  const updateRatingScore = (value) => setRating((r) => ({ ...r, overallRating: Math.round(value) }));
  const updateScore = (scoreId) => (value) =>
    setRating((r) => ({
      ...r,
      scores: r.scores.map((score) => ({
        ...score,
        ...(score.scoreId === scoreId ? { scoreValue: Math.round(value) } : {}),
      })),
    }));
  const updateRatingMetricName = (scoreId) => (value) =>
    setRating((r) => ({
      ...r,
      scores: r.scores.map((score) => ({
        ...score,
        ratingMetric: {
          ...score.ratingMetric,
          ...(score.scoreId === scoreId ? { ratingMetricName: value } : {}),
        },
      })),
    }));

  const addRatingMetric = () => {
    setRating((r) => ({
      ...r,
      scores: [
        ...r.scores,
        {
          ratingId: r.ratingId,
          scoreId: uuid(),
          ratingMetricId: '',
          ratingMetric: {
            ratingMetricId: '',
            ratingMetricName: '',
          },
        },
      ],
    }));
  };

  const [save, { loading: saving }] = useAsyncCallback(async () => {
    await upsertRating(rating);

    if (edit) {
      router.back();
    } else {
      router.back();
      // router.replace(`/category/${rating.categoryId}/item/${rating.itemId}`);
    }
  }, [rating]);

  const [del, { loading: deleting }] = useAsyncCallback(async () => {
    // await deleteRating(rating);
    // router.back();
  }, [rating]);

  return (
    <EditLayout>
      <View className="flex flex-grow">
        <Header title="Add a Rating" subtitle={state?.item?.itemName} />
        <View className="flex p-2">
          <TextInput name="Item Cost" onChange={updateRating('itemCost')} value={`${rating?.itemCost}`} />
          <TextInput name="Rating Notes" multiline onChange={updateRating('ratingNotes')} value={rating?.ratingNotes} />
          <View className="">
            <View className="mt-2">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-lg">Overall Rating</Text>
                <Text className="">{rating.overallRating} Rating</Text>
              </View>
              <Slider
                style={{}}
                minimumValue={1}
                maximumValue={10}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#FFFFFF"
                onValueChange={updateRatingScore}
                value={rating.overallRating}
              />
            </View>
            {rating?.scores.map((score: Score) => (
              <View className="mt-2" key={score.scoreId}>
                <View className="flex w-full flex-row items-center">
                  <View className="mr-8 flex flex-grow">
                    {score.ratingMetric.ratingMetricId ? (
                      <Text className="text-lg">{score.ratingMetric.ratingMetricName}</Text>
                    ) : (
                      <TextInput
                        onChange={updateRatingMetricName(score.scoreId)}
                        value={score.ratingMetric.ratingMetricName}
                        classNames="flex-row items-center gap-8"
                        textInputClassNames="flex-grow"
                        placeholder="Metric Name"
                      />
                    )}
                  </View>
                  <Text className="">{score.scoreValue} Rating</Text>
                </View>
                <View className="flex w-full flex-grow">
                  <Slider
                    style={{}}
                    minimumValue={1}
                    maximumValue={10}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#FFFFFF"
                    onValueChange={updateScore(score.scoreId)}
                    value={score.scoreValue}
                  />
                </View>
              </View>
            ))}
          </View>
          <Button onPress={addRatingMetric} text="Add Rating Metric" />
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
