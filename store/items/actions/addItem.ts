import { PayloadAction } from '@reduxjs/toolkit';
import { ItemState } from '..';
import { Item } from '../../../types';

const addItem = (state: ItemState, action: PayloadAction<Item>) => {
  return { ...state, items: [...state.items, action.payload] };
};

export default addItem;
