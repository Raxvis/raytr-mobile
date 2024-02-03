import { PayloadAction } from '@reduxjs/toolkit';
import { CategoryState } from '..';
import { Category } from '../../../types';

const updateCategory = (state: CategoryState, action: PayloadAction<Category>) => {
  const { categoryId, ...rest } = action.payload;

  return {
    ...state,
    categories: state.categories.map((category) => ({
      ...category,
      ...(category.categoryId === categoryId ? rest : {}),
    })),
  };
};

export default updateCategory;
