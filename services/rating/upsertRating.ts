import knex from '../../db';
import { Rating } from '../../types';
import round from '../../utils/round';
import uuid from '../../utils/uuid';

const getRatingMetric = async (ratingMetric) => {
  if (!ratingMetric.ratingMetricId) {
    const rs = await knex('ratingMetric').where('ratingMetricName', ratingMetric.ratingMetricName).first();

    if (rs) {
      return rs;
    }

    const temp = { ratingMetricId: uuid(), ratingMetricName: ratingMetric.ratingMetricName };

    await knex('ratingMetric').insert(temp).onConflict('ratingMetricId').merge();

    return temp;
  }

  return ratingMetric;
};

const upsertRating = async (payload: Rating) => {
  const { scores, ...rating } = payload;
  const validScores = scores.filter((score) => Boolean(score.scoreValue));
  const ratingTotal =
    validScores.length > 0
      ? validScores.reduce((result, score) => result + score.scoreValue, 0) / validScores.length
      : undefined;

  await knex('rating')
    .insert({ ...rating, compositeRating: round(ratingTotal) })
    .onConflict('ratingId')
    .merge();

  for (const score of scores) {
    if (score.scoreValue) {
      const { ratingMetric, ...scoreData } = score;
      const rs = await getRatingMetric(ratingMetric);

      await knex('score')
        .insert({ ...scoreData, ratingMetricId: rs.ratingMetricId })
        .onConflict('scoreId')
        .merge();
    }
  }
};

export default upsertRating;
