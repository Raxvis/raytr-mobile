import knex from '../../db';
import { Category, Item } from '../../types';
import round from '../../utils/round';

const getCategoryWithItems = async (categoryId) => {
  if (!categoryId) {
    return undefined;
  }

  const category: Category = await knex('category').where({ categoryId }).first();
  const ratings = await knex('rating').select('itemId', 'ratingTotal').where({ categoryId });
  const itemIds: Partial<Rating> = ratings.map(({ itemId }) => itemId);
  const items: Item[] = itemIds.length > 0 ? await knex('item').whereIn('itemId', itemIds) : [];

  const scores = ratings.reduce(
    (results, rating) => ({
      ...results,
      [rating.itemId]: {
        total: results[rating.itemId] ? results[rating.itemId].total + rating.ratingTotal : rating.ratingTotal,
        count: results[rating.itemId] ? results[rating.itemId].count + 1 : 1,
      },
    }),
    {},
  );

  return {
    category,
    items: items.map((item) => ({
      ...item,
      overallRating: round(scores[item.itemId].total / scores[item.itemId].count),
    })),
  };
};

export default getCategoryWithItems;
