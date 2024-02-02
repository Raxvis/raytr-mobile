import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../types';
import actions from './actions';

export interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: actions.addCategory,
    removeCategory: actions.removeCategory,
    clearCategories: () => initialState,
    setCategories: actions.setCategories,
  },
});

// Action creators are generated for each case reducer function
export const { addCategory, removeCategory, clearCategories, setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
