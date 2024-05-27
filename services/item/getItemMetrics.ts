import knex from '../../db';

const getItemMetrics = async (itemId: string) => {
  const categoryIds = await knex('itemCategory').where({ itemId }).pluck('categoryId');

  const ratingMetrics = await knex({ rs: 'ratingMetric' })
    .select('rs.*')
    .join({ s: 'score' }, 'rs.ratingMetricId', 's.ratingMetricId')
    .join({ r: 'rating' }, 's.ratingId', 'r.ratingId')
    .join({ ic: 'itemCategory' }, 'r.itemId', 'ic.itemId')
    .whereIn('ic.categoryId', categoryIds)
    .distinct();

  return ratingMetrics;
};

export default getItemMetrics;
