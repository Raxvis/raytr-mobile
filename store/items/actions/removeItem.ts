import { PayloadAction } from '@reduxjs/toolkit';
import { ItemState } from '..';

const removeItem = (state: ItemState, action: PayloadAction<string>) => {
  const newItems = state.items.filter((item) => item.itemId !== action.payload);

  return { ...state, items: newItems };
};

export default removeItem;
