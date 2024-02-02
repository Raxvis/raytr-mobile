import { PayloadAction } from '@reduxjs/toolkit';
import { ItemState } from '..';

const setItems = (state: ItemState, action: PayloadAction<Item[]>) => ({
  ...state,
  items: action.payload,
});

export default setItems;
