import { Category, RatingMetric } from '../../types';
import { TrashIcon } from 'react-native-heroicons/outline';
import { useCallback, useReducer } from 'react';
import { router } from 'expo-router';
import { View, Text } from 'react-native';
import Button from '../ui/Button';
import EditLayout from '../layout/EditLayout';
import IconButton from '../ui/IconButton';
import TextInput from '../ui/TextInput';
import uuid from '../../utils/uuid';
import Header from '../ui/Header';
import useAsyncCallback from '../../hooks/useAsyncCallback';
import upsertCategory from '../../services/category/upsertCategory';
import deleteCategory from '../../services/category/deleteCategory';

const getNewRatingMetric = (): RatingMetric => ({
  categoryId: '',
  ratingMetricId: uuid(),
  ratingMetricName: '',
});

const reducer = (state, { payload, type }: { payload?: any; type: string }) => {
  switch (type) {
    case 'SET':
      return { ...payload };
    case 'UPDATE':
      return { ...state, ...payload };
    case 'ADD_METRIC':
      return { ...state, ratingMetric: [...state.ratingMetric, getNewRatingMetric()] };
    case 'REMOVE_METRIC':
      return { ...state, ratingMetric: state.ratingMetric.filter(({ ratingMetricId }) => ratingMetricId !== payload) };
    case 'UPDATE_METRIC':
      const { ratingMetricId, ...rest } = payload;

      return {
        ...state,
        ratingMetric: state.ratingMetric.map((ratingMetric) => ({
          ...ratingMetric,
          ...(ratingMetricId === ratingMetric.ratingMetricId ? rest : {}),
        })),
      };
    default:
      return state;
  }
};

type EditCategoryProps = {
  edit?: boolean;
  initialState: Category;
};

const EditCategory = ({ edit, initialState }: EditCategoryProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateValue = (key) => (value) => dispatch({ type: 'UPDATE', payload: { [key]: value } });
  const updateRatingMetric = (ratingMetricId, key) => (value) =>
    dispatch({
      type: 'UPDATE_METRIC',
      payload: {
        ratingMetricId,
        [key]: value,
      },
    });

  const addRatingMetric = useCallback(() => {
    dispatch({ type: 'ADD_METRIC' });
  }, []);

  const removeRatingMetric = useCallback((ratingMetricId) => {
    dispatch({ type: 'REMOVE_METRIC', payload: ratingMetricId });
  }, []);

  const [save, { loading: saving }] = useAsyncCallback(async () => {
    await upsertCategory(state);

    router.replace(`/category/${state.categoryId}`);
  }, [state]);

  const [del, { loading: deleting }] = useAsyncCallback(async () => {
    await deleteCategory(state);

    while (router.canGoBack()) {
      // Pop from stack until one element is left
      router.back();
    }

    router.replace(`/`);
  }, [state]);

  return (
    <EditLayout>
      <View className="flex flex-grow">
        <Header title="Add Category" />
        <View className="flex p-2">
          <TextInput name="Category Name" onChange={updateValue('categoryName')} value={state.categoryName} />
          <TextInput
            multiline
            name="Category Description"
            onChange={updateValue('categoryDescription')}
            value={state.categoryDescription}
          />
          <View className="mt-2">
            <Text className="text-lg">Rating Metric</Text>
          </View>
          {(state.ratingMetric || []).map((ratingMetric) => (
            <View className="flex flex-row items-center space-y-2" key={ratingMetric.ratingMetricId}>
              <TextInput
                classNames="mr-4"
                onChange={updateRatingMetric(ratingMetric.ratingMetricId, 'ratingMetricName')}
                value={ratingMetric.ratingMetricName}
              />
              <IconButton onPress={() => removeRatingMetric(ratingMetric.ratingMetricId)} Icon={TrashIcon} />
            </View>
          ))}
          <Button onPress={addRatingMetric} text="Add Rating Metric" />
        </View>
      </View>
      <View className="mt-8 flex space-x-2 p-2">
        {edit ? (
          <Button disabled={saving} onPress={save} text="Save Category" />
        ) : (
          <Button disabled={saving} onPress={save} text="Add Category" />
        )}
        {edit ? <Button disabled={deleting} color="red" onPress={del} text="Delete Category" /> : null}
      </View>
    </EditLayout>
  );
};

export default EditCategory;
