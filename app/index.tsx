import { FlatList, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import FeedItem from '../components/FeedItem';
import Header from '../components/ui/Header';
import { useNavigation } from 'expo-router';
import knex from '../db';
import getRatingWithItem from '../services/rating/getRatingWithItem';
import { Item, Rating } from '../types';

const Feed = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<(Item & Rating)[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const items = await getRatingWithItem();

      setItems(items);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <FlatList
      ListHeaderComponent={<Header title="Feed" subtitle="A list of all your latest ratings" />}
      ListEmptyComponent={
        <View className="p-2">
          <Text className="text-lg">
            Looks like you don't have any ratings yet. You can add them by press the plus at the bottom of the screen
          </Text>
        </View>
      }
      data={items}
      className="flex flex-col"
      keyExtractor={(item) => item.ratingId}
      renderItem={({ item }) => <FeedItem {...item} />}
    />
  );
};

export default Feed;
