import knex from '../../db';
import { Category } from '../../types';

const getCategoryWithRatingMetric = async (categoryId): Promise<Category> => {
  if (!categoryId) {
    return undefined;
  }

  const category = await knex('category').where({ categoryId }).first();
  const ratingMetric = await knex('ratingMetric').where({ categoryId });

  return { ...category, ratingMetric };
};

export default getCategoryWithRatingMetric;
