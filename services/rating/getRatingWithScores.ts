import knex from '../../db';

const getRatingWithScores = async (ratingId) => {
  const rating = await knex('rating').where({ ratingId }).first();
  const scores = await knex('score').where({ ratingId });
  const ratingSchemas = await knex('ratingSchema').whereIn(
    'ratingSchemaId',
    scores.map(({ ratingSchemaId }) => ratingSchemaId),
  );

  return {
    ...rating,
    scores: scores.map((score) => ({
      ...score,
      ratingSchema: ratingSchemas.find(({ ratingSchemaId }) => ratingSchemaId === score.ratingSchemaId),
    })),
  };
};

export default getRatingWithScores;
