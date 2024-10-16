import { Cog6ToothIcon } from 'react-native-heroicons/outline';
import { Image, View, Text, ScrollView, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { Stack, router, useLocalSearchParams, useNavigation } from 'expo-router';
import getItemWithRatings from '../../../services/item/getItemWithRatings';
import { useEffect, useState } from 'react';
import Header from '../../../components/ui/Header';
import { Item } from '../../../types';
import RatingItem from '../../../components/RatingItem';
import NavButton from '../../../components/ui/NavButton';

const ItemPage = () => {
  const { itemId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const item = await getItemWithRatings(itemId);

      setItem(item);
    });

    return unsubscribe;
  }, [navigation, itemId]);

  if (!item) {
    // TODO: This should be a "item not found page"
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          // headerLeft: () => <NavButton onPress={() => router.navigate(`/`)} isBack text="Back" color="white" />,
          headerRight: () => (
            <NavButton onPress={() => router.navigate(`/item/${itemId}/edit`)} Icon={Cog6ToothIcon} color="white" />
          ),
        }}
      />
      <FlatList
        ListHeaderComponent={
          <View className="">
            <View className="">
              <Image style={{ width: '100%', height: undefined, aspectRatio: 1 }} source={{ uri: item.itemPicture }} />
            </View>
            <Header title={item?.itemName} subtitle={item?.itemDescription} />
          </View>
        }
        ListEmptyComponent={
          <View className="p-2">
            <Text className="text-lg">
              Looks like you don't have any ratings yet. You can add them by press the plus at the bottom of the screen
            </Text>
          </View>
        }
        data={item.ratings}
        className="flex flex-col"
        keyExtractor={(rating) => rating.ratingId}
        renderItem={({ item: rating }) => <RatingItem item={item} rating={rating} />}
      />
    </>
  );
};

export default ItemPage;
