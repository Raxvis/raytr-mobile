import knex from '../../db';

const upsertCategory = async (payload) => {
  try {
    const { ratingSchema, ...category } = payload;
    const previousCategory = await knex('category').where({ categoryId: category.categoryId }).first();

    if (previousCategory) {
      await knex('category').update(category).where({ categoryId: category.categoryId });
    } else {
      await knex('category').insert(category);
    }
    for (const schema of ratingSchema) {
      if (schema.categoryId) {
        await knex('ratingSchema').update(schema).where({ ratingSchemaId: schema.ratingSchemaId });
      } else {
        await knex('ratingSchema').insert({ ...schema, categoryId: category.categoryId });
      }
    }
    const ratingSchemaIds = ratingSchema.map(({ ratingSchemaId }) => ratingSchemaId);
    await knex('ratingSchema')
      .del()
      .where({ categoryId: category.categoryId })
      .whereNotIn('ratingSchemaId', ratingSchemaIds);
  } catch (error) {
    console.log(error);
  }
};

export default upsertCategory;
