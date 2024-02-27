import { PayloadAction } from '@reduxjs/toolkit';
import { RatingState } from '..';
import { Rating } from '../../../types';

const addRating = (state: RatingState, action: PayloadAction<Rating>) => {
  return { ...state, ratings: [...state.ratings, action.payload] };
};

export default addRating;
