import knex from '../../db';
import { Category, Item } from '../../types';

const getCategoryWithItems = async (categoryId) => {
  const category: Category = await knex('category').where({ categoryId }).first();
  const itemIds = await knex('rating').where({ categoryId }).pluck('itemId');
  const items: Item[] = itemIds.length > 0 ? await knex('item').whereIn('itemId', itemIds) : [];

  return {
    category,
    items,
  };
};

export default getCategoryWithItems;
