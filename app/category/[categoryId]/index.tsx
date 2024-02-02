import { View, Text, FlatList } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import testCategories from '../../../store/test.categories';
import testItems from '../../../store/test.items';
import { useMemo } from 'react';
import getItemsWithRatingsByCategory from '../../../utils/getItemsWithRatingsByCategory';
import CategoryItem from '../../../components/CategoryItem';

export default function Category() {
  const { categoryId } = useLocalSearchParams();
  const { categories } = useSelector((state: RootState) => state.categories);
  const { items } = useSelector((state: RootState) => state.items);

  const category = useMemo(() => testCategories.find((category) => category.categoryId === categoryId), []);
  const categoryItems = useMemo(() => getItemsWithRatingsByCategory(category, testItems), [category]);

  console.log({ categoryId });
  return (
    <View className="flex h-full p-2">
      <View className="mb-8 flex border-b border-gray-900 pb-4">
        <Text className="text-2xl ">{category.categoryName}</Text>
        <Text className="text-md">{category.categoryDescription}</Text>
      </View>
      {categoryItems.length > 0 ? (
        <FlatList
          data={categoryItems}
          className="flex flex-col"
          keyExtractor={(item) => item.itemId}
          renderItem={({ item }) => <CategoryItem category={category} item={item} />}
        />
      ) : (
        <Text className="text-md">
          Looks like you don't have any categories yet. You can add them by press the plus at the bottom of the screen
        </Text>
      )}
    </View>
  );
}
