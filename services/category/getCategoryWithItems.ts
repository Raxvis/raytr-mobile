import knex from '../../db';
import { Category, Item } from '../../types';

const getCategoryWithItems = async (categoryId) => {
  const category: Category = await knex('category').where({ categoryId }).first();
  const ratings = await knex('rating').select('itemId', 'ratingTotal').where({ categoryId });
  const itemIds: Partial<Rating> = ratings.map(({ itemId }) => itemId);
  const items: Item[] = itemIds.length > 0 ? await knex('item').whereIn('itemId', itemIds) : [];

  const scores = ratings.reduce(
    (results, rating) => ({
      ...results,
      [rating.itemId]: (results[rating.itemId] || 0) + rating.ratingTotal,
    }),
    {},
  );

  return {
    category,
    items: items.map((item) => ({
      ...item,
      overallRating: scores[item.itemId],
    })),
  };
};

export default getCategoryWithItems;
