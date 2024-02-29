import knex from '../../db';
import { Score } from '../../types';
import uuid from '../../utils/uuid';

const addRating = async (rating, scores) => {
  const parsedScores = Object.keys(scores).map(
    (ratingSchemaId): Score => ({
      scoreId: uuid(),
      ratingId: rating.ratingId,
      ratingSchemaId,
      scoreValue: scores[ratingSchemaId],
    }),
  );
  const ratingTotal = parsedScores.reduce((result, score) => result + score.scoreValue, 0) / parsedScores.length;

  await knex('rating').insert({
    ...rating,
    ratingTotal: Math.round(ratingTotal * 100) / 100,
  });

  if (parsedScores.length > 0) {
    await knex('score').insert(parsedScores);
  }
};

export default addRating;
