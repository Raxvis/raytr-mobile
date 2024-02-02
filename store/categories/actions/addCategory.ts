import { PayloadAction } from '@reduxjs/toolkit';
import { CategoryState } from '..';
import { Category } from '../../../types';

const addToCategories = (state: CategoryState, action: PayloadAction<Category>) => {
  return { ...state, categories: [...state.categories, action.payload] };
};

export default addToCategories;
