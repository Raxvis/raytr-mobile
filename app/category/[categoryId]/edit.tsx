import { RatingSchema } from '../../../types';
import { RootState } from '../../../store/configureStore';
import { removeCategory, updateCategory } from '../../../store/categories';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import uuid from '../../../utils/uuid';

const getNewRatingSchema = (): RatingSchema => ({
  ratingSchemaId: uuid(),
  ratingSchemaName: '',
  ratingSchemaType: 'SLIDER',
  ratingSchemaWeight: 5,
});

const reducer = (state, { payload, type }: { payload?: any; type: string }) => {
  switch (type) {
    case 'SET':
      return { ...payload };
    case 'UPDATE':
      return { ...state, ...payload };
    case 'ADD_METRIC':
      return { ...state, ratingSchema: [...state.ratingSchema, getNewRatingSchema()] };
    case 'UPDATE_METRIC':
      const { ratingSchemaId, ...rest } = payload;

      return {
        ...state,
        ratingSchema: state.ratingSchema.map((ratingSchema) => ({
          ...ratingSchema,
          ...(ratingSchemaId === ratingSchema.ratingSchemaId ? rest : {}),
        })),
      };
    default:
      return state;
  }
};

const EditCategory = () => {
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useReducer(reducer, {});
  const { categoryId } = useLocalSearchParams();
  const { categories } = useSelector((state: RootState) => state.categories);

  const category = useMemo(() => categories.find((category) => category.categoryId === categoryId), []);

  const updateValue = (key) => (value) => dispatch({ type: 'UPDATE', payload: { [key]: value } });
  const updateRatingSchema = (ratingSchemaId, key) => (value) =>
    dispatch({
      type: 'UPDATE_METRIC',
      payload: {
        ratingSchemaId,
        [key]: value,
      },
    });

  useEffect(() => {
    dispatch({ type: 'SET', payload: category });
  }, [category]);

  const addRatingMetric = useCallback(() => {
    dispatch({ type: 'ADD_METRIC' });
  }, []);

  const saveCategory = useCallback(() => {
    reduxDispatch(updateCategory(state));
    router.replace(`/category/${state.categoryId}`);
  }, [state]);

  const deleteCategory = useCallback(() => {
    reduxDispatch(removeCategory(state.categoryId));
    while (router.canGoBack()) {
      // Pop from stack until one element is left
      router.back();
    }
    router.replace(`/`);
  }, [state]);

  return (
    <View className="flex h-full p-2">
      <ScrollView className="flex flex-grow">
        <View className="mb-4 flex border-b border-gray-900 pb-4">
          <Text className="text-2xl ">Add Category</Text>
        </View>
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
        {(state.ratingSchema || []).map((ratingSchema) => (
          <View key={ratingSchema.ratingSchemaId}>
            <TextInput
              onChange={updateRatingSchema(ratingSchema.ratingSchemaId, 'ratingSchemaName')}
              value={ratingSchema.ratingSchemaName}
            />
          </View>
        ))}
        <Button onPress={addRatingMetric} text="Add Rating Metric" />
      </ScrollView>
      <View className="ios:mb-12 android:mb-4 flex space-x-2">
        <Button onPress={saveCategory} text="Save Category" />
        <Button color="red" onPress={deleteCategory} text="Delete Category" />
      </View>
    </View>
  );
};

export default EditCategory;
