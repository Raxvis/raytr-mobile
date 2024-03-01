import { useLocalSearchParams } from 'expo-router';
import { Rating } from '../../types';
import uuid from '../../utils/uuid';
import RatingForm from '../../components/form/RatingForm';

const getNewRating = (categoryId, itemId): Rating => ({
  ratingId: uuid(),
  categoryId: categoryId || '',
  itemId: itemId || '',
  ratingTime: Date.now(),
  scores: [],
});

const AddRating = () => {
  const params = useLocalSearchParams();

  return <RatingForm initialState={getNewRating(params.categoryId, params.itemId)} />;
};

export default AddRating;
