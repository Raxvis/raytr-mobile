import { View, Text } from 'react-native';
import { Link, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useReducer, useState } from 'react';
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
import useRatingForm from '../../reducers/useRatingForm';

type ItemFormProps = {
  edit?: boolean;
  initialState: Rating;
};

const RatingForm = ({ edit, initialState }: ItemFormProps) => {
  const { actions, state } = useRatingForm(initialState);

  useAsyncEffect(async () => {
    // Get schema for item
    const ratingMetrics = await getItemRatings(initialState.itemId);
    const item = await getItem(initialState.itemId);

    if (item) actions.setItem(item);
    if (ratingMetrics) actions.setRatingMetric(ratingMetrics);
  }, [initialState]);

  const [save, { loading: saving }] = useAsyncCallback(async () => {
    try {
      console.log(state.rating);
      await upsertRating(state.rating);

      if (edit) {
        router.back();
      } else {
        router.back();
        // router.replace(`/item/${rating.itemId}`);
      }
    } catch (e) {
      console.log(e);
    }
  }, [state.rating]);

  const [del, { loading: deleting }] = useAsyncCallback(async () => {
    console.log(state);
    // await deleteRating(rating);
    // router.back();
  }, [state.rating]);

  return (
    <EditLayout>
      <View className="flex flex-grow">
        <Header title="Add a Rating" subtitle={state?.item?.itemName} />
        <View className="flex p-2">
          <TextInput
            name="Rating Notes"
            multiline
            onChange={(value) => actions.updateRating({ ratingNotes: value })}
            value={state?.rating?.ratingNotes}
          />
          <View className="">
            <View className="mt-2">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-lg">Overall Rating</Text>
                <Text className="">{state?.rating?.overallRating} Rating</Text>
              </View>
              <Slider
                style={{}}
                minimumValue={1}
                maximumValue={10}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#FFFFFF"
                onValueChange={(value) => actions.updateRating({ overallRating: Math.round(value) })}
                value={state?.rating?.overallRating}
              />
            </View>
            {state?.rating?.scores.map((score: Score) => (
              <View className="mt-2" key={score.scoreId}>
                <View className="flex w-full flex-row items-center">
                  <View className="mr-8 flex flex-grow">
                    {score.ratingMetric.ratingMetricId ? (
                      <Text className="text-lg">{score.ratingMetric.ratingMetricName}</Text>
                    ) : (
                      <TextInput
                        onChange={(value) =>
                          actions.updateRatingMetricName({ scoreId: score.scoreId, ratingMetricName: value })
                        }
                        value={score.ratingMetric.ratingMetricName}
                        classNames="flex-row items-center gap-8"
                        textInputClassNames="flex-grow"
                        placeholder="Metric Name"
                      />
                    )}
                  </View>
                  <Text className="">{score.score} Rating</Text>
                </View>
                <View className="flex w-full flex-grow">
                  <Slider
                    style={{}}
                    minimumValue={1}
                    maximumValue={10}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#FFFFFF"
                    onValueChange={(value) => actions.updateScore({ scoreId: score.scoreId, score: Math.round(value) })}
                    value={score.score}
                  />
                </View>
              </View>
            ))}
          </View>
          <Button onPress={actions.addRatingMetric} text="Add Rating Metric" />
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
