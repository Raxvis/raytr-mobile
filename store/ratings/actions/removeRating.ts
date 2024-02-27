import { PayloadAction } from '@reduxjs/toolkit';
import { RatingState } from '..';

const removeRating = (state: RatingState, action: PayloadAction<string>) => {
  const newRatings = state.ratings.filter((rating) => rating.ratingId !== action.payload);

  return { ...state, ratings: newRatings };
};

export default removeRating;
