import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import getRatingWithScores from '../../../../../../../services/rating/getRatingWithScores';
import useAsyncEffect from '../../../../../../../hooks/useAsyncEffect';
import RatingForm from '../../../../../../../components/form/RatingForm';
import { Rating } from '../../../../../../../types';

const EditRating = () => {
  const { ratingId } = useLocalSearchParams();
  const [rating, setRating] = useState<Rating | undefined>();

  useAsyncEffect(async () => {
    const result = await getRatingWithScores(ratingId);

    setRating(result);
  }, [ratingId]);

  if (!rating) {
    return null;
  }

  return <RatingForm edit initialState={rating} />;
};

export default EditRating;
