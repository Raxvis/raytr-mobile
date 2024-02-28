import knex from '../../db';
import { Category } from '../../types';

const getCategoryWithRatingSchema = async (categoryId): Promise<Category> => {
  const category = await knex('category').where({ categoryId }).first();
  const ratingSchema = await knex('ratingSchema').where({ categoryId });

  return { ...category, ratingSchema };
};

export default getCategoryWithRatingSchema;
