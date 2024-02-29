import { Cog6ToothIcon } from 'react-native-heroicons/outline';
import { Stack, useLocalSearchParams, router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import CategoryItem from '../../../components/CategoryItem';
import NavButton from '../../../components/ui/NavButton';
import Header from '../../../components/ui/Header';
import { Category, Item } from '../../../types';
import getCategoryWithItems from '../../../services/category/getCategoryWithItems';

const CategoryPage = () => {
  const navigation = useNavigation();
  const { categoryId } = useLocalSearchParams();
  const [category, setCategory] = useState<Category | undefined>();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const { category, items } = await getCategoryWithItems(categoryId);

      setCategory(category);
      setItems(items);
    });

    return unsubscribe;
  }, [navigation, categoryId]);

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
