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
    removeItem: actions.removeItem,
    clearItems: () => initialState,
    setItems: actions.setItems,
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
