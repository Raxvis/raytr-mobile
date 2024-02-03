import { FlatList, Text, View } from 'react-native';
import { RootState } from '../store/configureStore';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CategoryListItem from '../components/CategoryListItem';
import getItemsByCategory from '../utils/getItemsByCategory';

const Categories = () => {
  const { categories } = useSelector((state: RootState) => state.categories);
  const { items } = useSelector((state: RootState) => state.items);

  const coupledCategories = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        items: getItemsByCategory(category, items),
      })),
    [categories, items],
  );

  return (
    <View className="flex h-full p-2">
      <View className="mb-8 flex border-b border-gray-900 pb-4">
        <Text className="text-2xl">Categories</Text>
        <Text className="text-lg">A list of all your categories</Text>
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
};

export default Categories;
