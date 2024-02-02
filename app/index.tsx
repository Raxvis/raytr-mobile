import { Link } from 'expo-router';
import { FlatList, Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import testCategories from '../store/test.categories';
import testItems from '../store/test.items';
import CategoryListItem from '../components/CategoryListItem';
import { useMemo } from 'react';
import getItemsByCategory from '../utils/getItemsByCategory';

export default function Categories() {
  const { categories } = useSelector((state: RootState) => state.categories);
  const { items } = useSelector((state: RootState) => state.items);

  const coupledCategories = useMemo(
    () =>
      testCategories.map((category) => ({
        ...category,
        items: getItemsByCategory(category, testItems),
      })),
    [],
  );

  return (
    <View className="flex h-full p-2">
      <View className="mb-8 flex border-b border-gray-900 pb-4">
        <Text className="text-2xl ">Categories</Text>
        <Text className="text-lg ">A list of all your categories</Text>
      </View>
      {coupledCategories.length > 0 ? (
        <FlatList
          data={coupledCategories}
          className="flex flex-col"
          keyExtractor={(item) => item.categoryId}
          renderItem={({ item }) => <CategoryListItem category={item} />}
        />
      ) : (
        <Text className="text-md">
          Looks like you don't have any categories yet. You can add them by press the plus at the bottom of the screen
        </Text>
      )}
    </View>
  );
}
