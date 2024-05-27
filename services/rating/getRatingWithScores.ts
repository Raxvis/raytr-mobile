import knex from '../../db';

const getRatingWithScores = async (ratingId) => {
  const rating = await knex('rating').where({ ratingId }).first();
  const scores = await knex('score').where({ ratingId });
  const ratingMetrics = await knex('ratingMetric').whereIn(
    'ratingMetricId',
    scores.map(({ ratingMetricId }) => ratingMetricId),
  );

  return {
    ...rating,
    scores: scores.map((score) => ({
      ...score,
      ratingMetric: ratingMetrics.find(({ ratingMetricId }) => ratingMetricId === score.ratingMetricId),
    })),
  };
};

export default getRatingWithScores;
