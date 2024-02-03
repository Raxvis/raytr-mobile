import { PayloadAction } from '@reduxjs/toolkit';
import { CategoryState } from '..';
import { Category } from '../../../types';

const setCategories = (state: CategoryState, action: PayloadAction<Category[]>) => ({
  ...state,
  categories: action.payload,
});

export default setCategories;
