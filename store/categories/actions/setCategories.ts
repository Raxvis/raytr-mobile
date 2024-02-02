import { PayloadAction } from '@reduxjs/toolkit';
import { CategoryState } from '..';

const setCategories = (state: CategoryState, action: PayloadAction<Category[]>) => ({
  ...state,
  categories: action.payload,
});

export default setCategories;
