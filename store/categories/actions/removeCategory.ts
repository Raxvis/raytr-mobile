import { PayloadAction } from '@reduxjs/toolkit';
import { CategoryState } from '..';

const removeFromCategories = (state: CategoryState, action: PayloadAction<string>) => {
  const newItems = state.categories.filter((category) => category.categoryId !== action.payload);

  return { ...state, categories: newItems };
};

export default removeFromCategories;
