import { Cog6ToothIcon } from 'react-native-heroicons/outline';
import { RootState } from '../../../store/configureStore';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import CategoryItem from '../../../components/CategoryItem';
import getItemsWithRatingsByCategory from '../../../utils/getItemsWithRatingsByCategory';
import NavButton from '../../../components/ui/NavButton';
import Header from '../../../components/ui/Header';
import useAsyncEffect from '../../../hooks/useAsyncEffect';
import { Category, Item } from '../../../types';
import getCategoryWithItems from '../../../services/category/getCategoryWithItems';

const CategoryPage = () => {
  const { categoryId } = useLocalSearchParams();
  const [category, setCategory] = useState<Category | undefined>();
  const [items, setItems] = useState<Item[]>([]);

  useAsyncEffect(async () => {
    const { category, items } = await getCategoryWithItems(categoryId);

    setCategory(category);
    setItems(items);
  }, [categoryId]);

  if (!category) {
    return null;
  }

  return (
    <View className="flex h-full">
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
      <Header title={category.categoryName} subtitle={category.categoryDescription} />
      {items.length > 0 ? (
        <FlatList
          data={items}
          className="flex flex-col"
          keyExtractor={(item) => item.itemId}
          renderItem={({ item }) => <CategoryItem category={category} item={item} />}
        />
      ) : (
        <View className="p-2">
          <Text className="text-lg">
            Looks like you don't have any ratings yet. You can add them by press the plus at the bottom of the screen
          </Text>
        </View>
      )}
    </View>
  );
};

export default CategoryPage;
