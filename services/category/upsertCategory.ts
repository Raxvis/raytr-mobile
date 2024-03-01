import knex from '../../db';

const upsertCategory = async (payload) => {
  const { ratingSchema, ...category } = payload;

  await knex('category').insert(category).onConflict('categoryId').merge();

  for (const schema of ratingSchema) {
    await knex('ratingSchema')
      .insert({ ...schema, categoryId: category.categoryId })
      .onConflict('ratingSchemaId')
      .merge();
  }

  const ratingSchemaIds = ratingSchema.map(({ ratingSchemaId }) => ratingSchemaId);
  await knex('ratingSchema')
    .del()
    .where({ categoryId: category.categoryId })
    .whereNotIn('ratingSchemaId', ratingSchemaIds);
};

export default upsertCategory;
