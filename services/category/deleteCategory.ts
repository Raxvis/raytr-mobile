import knex from '../../db';

const deleteCategory = async (payload) => {
  await knex('ratingSchema').del().where({ categoryId: payload.categoryId });
  await knex('category').del().where({ categoryId: payload.categoryId });
};

export default deleteCategory;
