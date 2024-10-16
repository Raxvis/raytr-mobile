import knex from '../../db';
import { Rating } from '../../types';
import round from '../../utils/round';
import uuid from '../../utils/uuid';

const getRatingMetric = async (ratingMetric) => {
  if (ratingMetric.ratingMetricId) {
    const rm = await knex('ratingMetric').where({ ratingMetricId: ratingMetric.ratingMetricId }).first();

    if (rm) return rm;
  }

  const rm = await knex('ratingMetric').whereLike('ratingMetricName', ratingMetric.ratingMetricName).first();

  if (rm) {
    return rm;
  }

  const temp = { ratingMetricId: uuid(), ratingMetricName: ratingMetric.ratingMetricName };

  await knex('ratingMetric').insert(temp);

  return temp;
};

const upsertRating = async (payload: Rating) => {
  const { scores, ...rating } = payload;
  const validScores = scores.filter((score) => Boolean(score.score));
  const ratingTotal =
    validScores.length > 0
      ? validScores.reduce((result, score) => result + score.score, 0) / validScores.length
      : undefined;

  await knex('rating')
    .insert({ ...rating, compositeRating: round(ratingTotal) })
    .onConflict('ratingId')
    .merge();

  for (const score of scores) {
    if (score.score) {
      const { ratingMetric, ...scoreData } = score;
      const rm = await getRatingMetric(ratingMetric);

      await knex('score')
        .insert({ ...scoreData, ratingMetricId: rm.ratingMetricId })
        .onConflict('scoreId')
        .merge();
    }
  }
};

export default upsertRating;
