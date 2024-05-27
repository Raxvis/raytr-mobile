import knex from '../../db';

const deleteCategory = async (category) => {
  await knex('ratingMetric').del().where({ categoryId: category.categoryId });
  await knex('category').del().where({ categoryId: category.categoryId });
};

export default deleteCategory;
