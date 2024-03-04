import knex from '../../db';

const getItemSchemas = async (itemId: string) => {
  const categoryIds = await knex('itemCategory').where({ itemId }).pluck('categoryId');

  const ratingSchemas = await knex({ rs: 'ratingSchema' })
    .select('rs.*')
    .join({ s: 'score' }, 'rs.ratingSchemaId', 's.ratingSchemaId')
    .join({ r: 'rating' }, 's.ratingId', 'r.ratingId')
    .join({ ic: 'itemCategory' }, 'r.itemId', 'ic.itemId')
    .whereIn('ic.categoryId', categoryIds)
    .distinct();

  return ratingSchemas;
};

export default getItemSchemas;
