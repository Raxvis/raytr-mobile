import knex from '../../db';

const upsertCategory = async (payload) => {
  const { ratingMetric, ...category } = payload;

  await knex('category').insert(category).onConflict('categoryId').merge();

  for (const schema of ratingMetric) {
    await knex('ratingMetric')
      .insert({ ...schema, categoryId: category.categoryId })
      .onConflict('ratingMetricId')
      .merge();
  }

  const ratingMetricIds = ratingMetric.map(({ ratingMetricId }) => ratingMetricId);
  await knex('ratingMetric')
    .del()
    .where({ categoryId: category.categoryId })
    .whereNotIn('ratingMetricId', ratingMetricIds);
};

export default upsertCategory;
