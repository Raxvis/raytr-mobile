import knex from '../../db';
import { Rating } from '../../types';
import round from '../../utils/round';

const upsertRating = async (payload: Rating) => {
  const { scores, ...rating } = payload;
  const validScores = scores.filter((score) => Boolean(score.scoreValue));
  const ratingTotal = scores.reduce((result, score) => result + score.scoreValue, 0) / validScores.length;

  await knex('rating')
    .insert({ ...rating, ratingTotal: round(ratingTotal) })
    .onConflict('ratingId')
    .merge();

  if (scores.length > 0) {
    await knex('score')
      .insert(
        scores.map((score) => ({
          scoreId: score.scoreId,
          ratingId: score.ratingId,
          ratingSchemaId: score.ratingSchemaId,
          scoreValue: score.scoreValue,
        })),
      )
      .onConflict('scoreId')
      .merge();
  }
};

export default upsertRating;
