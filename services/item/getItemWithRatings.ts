import knex from '../../db';

const getItemWithRatings = async (itemId) => {
  if (!itemId) {
    return undefined;
  }
  const item = await knex('item').where({ itemId }).first();
  const ratings = await knex('rating').where({ itemId }).orderBy('ratingTime', 'DESC');
  const scores = await knex('score').whereIn(
    'ratingId',
    ratings.map(({ ratingId }) => ratingId),
  );

  return {
    ...item,
    ratings: ratings.map((rating) => ({
      ...rating,
      scores: scores.find((score) => score.ratingId === rating.ratingId),
    })),
  };
};

export default getItemWithRatings;
