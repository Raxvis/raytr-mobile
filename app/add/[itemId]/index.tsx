import { useLocalSearchParams } from 'expo-router';
import RatingForm from '../../../components/form/RatingForm';
import uuid from '../../../utils/uuid';
import { Rating } from '../../../types';

const getNewRating = (itemId): Rating => ({
  ratingId: uuid(),
  itemId: itemId || '',
  ratingTime: Date.now(),
  scores: [],
});

const AddItemRating = () => {
  const params = useLocalSearchParams();

  return <RatingForm initialState={getNewRating(params.itemId)} />;
};

export default AddItemRating;
