import { FlatList, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import CategoryListItem from '../components/CategoryListItem';
import Header from '../components/ui/Header';
import { useNavigation } from 'expo-router';
import getAllCategories from '../services/category/getAllCategories';

const Categories = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const results = await getAllCategories();

      setCategories(results);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View className="flex h-full divide-y divide-gray-100">
      <Header title="Categories" subtitle="A list of all your categories" />
      {categories.length > 0 ? (
        <FlatList
          data={categories}
          className="flex flex-col"
          keyExtractor={(item) => item.categoryId}
          renderItem={({ item }) => <CategoryListItem category={item} />}
        />
      ) : (
        <View className="p-2">
          <Text className="text-lg">
            Looks like you don't have any categories yet. You can add them by press the plus at the bottom of the screen
          </Text>
        </View>
      )}
    </View>
  );
};

export default Categories;
