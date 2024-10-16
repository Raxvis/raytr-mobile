import { Cog6ToothIcon } from 'react-native-heroicons/outline';
import { View, Text, FlatList } from 'react-native';
import { Stack, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import getRatingWithScores from '../../../../../services/rating/getRatingWithScores';
import { Rating } from '../../../../../types';
import NavButton from '../../../../../components/ui/NavButton';
import Header from '../../../../../components/ui/Header';
import ScoreItem from '../../../../../components/ScoreItem';

const RatingPage = () => {
  const { categoryId, itemId, ratingId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [rating, setRating] = useState<Rating>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const rating = await getRatingWithScores(ratingId);

      setRating(rating);
    });

    return unsubscribe;
  }, [navigation, ratingId]);

  if (!rating) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          // headerLeft: () => <NavButton onPress={() => router.navigate(`/`)} isBack text="Back" color="white" />,
          headerRight: () => (
            <NavButton
              onPress={() => router.navigate(`/category/${categoryId}/item/${itemId}/rating/${ratingId}/edit`)}
              Icon={Cog6ToothIcon}
              color="white"
            />
          ),
        }}
      />
      <FlatList
        ListHeaderComponent={
          <Header title={new Date(rating.ratingTime).toLocaleDateString()} subtitle={rating.ratingNotes} />
        }
        ListEmptyComponent={
          <View className="p-2">
            <Text className="text-lg">It looks like there aren't any ratings here, hmm, that's weird</Text>
          </View>
        }
        data={rating.scores}
        className="flex flex-col"
        keyExtractor={(score) => score.scoreId}
        renderItem={({ item: score }) => <ScoreItem score={score} />}
      />
    </>
  );
};

export default RatingPage;
