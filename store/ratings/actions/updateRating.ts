import { PayloadAction } from '@reduxjs/toolkit';
import { RatingState } from '..';
import { Rating } from '../../../types';

const updateRating = (state: RatingState, action: PayloadAction<Rating>) => {
  const { ratingId, ...rest } = action.payload;

  return {
    ...state,
    ratings: state.ratings.map((rating) => ({
      ...rating,
      ...(rating.ratingId === ratingId ? rest : {}),
    })),
  };
};

export default updateRating;
