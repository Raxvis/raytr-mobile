import { FlatList, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import FeedItem from '../components/FeedItem';
import Header from '../components/ui/Header';
import { useNavigation } from 'expo-router';
import knex from '../db';

// import getAllCategories from '../services/category/getAllCategories';

const Categories = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const items = await knex({ r: 'rating' })
        .select('i.*', 'r.*')
        .join({ i: 'item' }, 'i.itemId', '=', 'r.itemId')
        .orderBy('ratingTime', 'desc')
        .limit(100);

      setItems(items);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <FlatList
      ListHeaderComponent={<Header title="Items" subtitle="A list of all your items" />}
      ListEmptyComponent={
        <View className="p-2">
          <Text className="text-lg">
            Looks like you don't have any ratings yet. You can add them by press the plus at the bottom of the screen
          </Text>
        </View>
      }
      data={items}
      className="flex flex-col"
      keyExtractor={(item) => item.itemId}
      renderItem={({ item }) => <FeedItem category={item} />}
    />
  );
};

export default Categories;
