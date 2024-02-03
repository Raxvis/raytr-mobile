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
    clearCategories: () => initialState,
    removeCategory: actions.removeCategory,
    setCategories: actions.setCategories,
    updateCategory: actions.updateCategory,
  },
});

export const { addCategory, removeCategory, clearCategories, setCategories, updateCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
