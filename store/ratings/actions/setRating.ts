import { PayloadAction } from '@reduxjs/toolkit';
import { RatingState } from '..';

const setRating = (state: RatingState, action: PayloadAction<Rating[]>) => ({
  ...state,
  ratings: action.payload,
});

export default setRating;
