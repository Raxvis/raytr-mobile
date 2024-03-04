import { View, Text } from 'react-native';
import { Link, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import EditLayout from '../../../components/layout/EditLayout';
import Header from '../../../components/ui/Header';

const AddItemRating = () => {
  const params = useLocalSearchParams();
  const [itemId, setItemId] = useState('');

  useEffect(() => {
    if (params && params.itemId && !Array.isArray(params.itemId)) {
      setItemId(params.itemId);
    }
  }, [params.itemId]);

  return (
    <EditLayout>
      <View className="flex flex-grow">
        <Header title="Add a Rating" />
        <View className="flex p-2">
          <Text className="text-sm italic text-gray-600">{itemId}</Text>
        </View>
      </View>
    </EditLayout>
  );
};

export default AddItemRating;

// const getNewRating = (categoryId, itemId): Rating => ({
//   ratingId: uuid(),
//   categoryId: categoryId || '',
//   itemId: itemId || '',
//   ratingTime: Date.now(),
//   scores: [],
// });

// const AddRating = () => {
//   const params = useLocalSearchParams();

//   return <RatingForm initialState={getNewRating(params.categoryId, params.itemId)} />;
// };
