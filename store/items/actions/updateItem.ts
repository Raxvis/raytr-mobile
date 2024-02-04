import { PayloadAction } from '@reduxjs/toolkit';
import { ItemState } from '..';
import { Item } from '../../../types';

const updateItem = (state: ItemState, action: PayloadAction<Item>) => {
  const { itemId, ...rest } = action.payload;

  return {
    ...state,
    items: state.items.map((item) => ({
      ...item,
      ...(item.itemId === itemId ? rest : {}),
    })),
  };
};

export default updateItem;
