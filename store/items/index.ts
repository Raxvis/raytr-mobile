import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../types';
import actions from './actions';

export interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: [],
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: actions.addItem,
    clearItems: () => initialState,
    removeItem: actions.removeItem,
    setItems: actions.setItems,
    updateItem: actions.updateItem,
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, setItems, updateItem } = itemsSlice.actions;

export default itemsSlice.reducer;
