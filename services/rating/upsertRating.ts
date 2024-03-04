import knex from '../../db';
import { Rating } from '../../types';
import round from '../../utils/round';
import uuid from '../../utils/uuid';

const getRatingSchema = async (ratingSchema) => {
  if (!ratingSchema.ratingSchemaId) {
    const rs = await knex('ratingSchema').where('ratingSchemaName', ratingSchema.ratingSchemaName).first();

    if (rs) {
      return rs;
    }

    const temp = { ratingSchemaId: uuid(), ratingSchemaName: ratingSchema.ratingSchemaName };

    await knex('ratingSchema').insert(temp).onConflict('ratingSchemaId').merge();

    return temp;
  }

  return ratingSchema;
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
      const { ratingSchema, ...scoreData } = score;
      const rs = await getRatingSchema(ratingSchema);

      await knex('score')
        .insert({ ...scoreData, ratingSchemaId: rs.ratingSchemaId })
        .onConflict('scoreId')
        .merge();
    }
  }
};

export default upsertRating;
