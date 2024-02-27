import { createSlice } from '@reduxjs/toolkit';
import { Rating } from '../../types';
import actions from './actions';

export interface RatingState {
  ratings: Rating[];
}

const initialState: RatingState = {
  ratings: [],
};

export const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    addRating: actions.addRating,
    clearRatings: () => initialState,
    removeRating: actions.removeRating,
    setRatings: actions.setRatings,
    updateRating: actions.updateRating,
  },
});

// Action creators are generated for each case reducer function
export const { addRating, removeRating, clearRatings, setRatings, updateRating } = ratingSlice.actions;

export default ratingSlice.reducer;
