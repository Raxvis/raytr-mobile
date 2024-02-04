import { Cog6ToothIcon } from 'react-native-heroicons/outline';
import { RootState } from '../../../store/configureStore';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import CategoryItem from '../../../components/CategoryItem';
import getItemsWithRatingsByCategory from '../../../utils/getItemsWithRatingsByCategory';
import NavButton from '../../../components/ui/NavButton';

const Category = () => {
  const { categoryId } = useLocalSearchParams();
  const { categories } = useSelector((state: RootState) => state.categories);
  const { items } = useSelector((state: RootState) => state.items);

  const category = useMemo(() => categories.find((category) => category.categoryId === categoryId), [categoryId]);
  const categoryItems = useMemo(() => getItemsWithRatingsByCategory(category, items), [category, items]);

  if (!category) {
    return null;
  }

  return (
    <View className="flex h-full p-2">
      <Stack.Screen
        options={{
          headerLeft: () => <NavButton onPress={() => router.navigate(`/`)} isBack text="Back" color="white" />,
          headerRight: () => (
            <NavButton
              onPress={() => router.navigate(`/category/${categoryId}/edit`)}
              Icon={Cog6ToothIcon}
              color="white"
            />
          ),
        }}
      />
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
          Looks like you don't have any items yet. You can add them by press the plus at the bottom of the screen
        </Text>
      )}
    </View>
  );
};

export default Category;
