import knex from '../../db';

const deleteRating = async (rating) => {
  await knex('score').del().where({ ratingId: rating.ratingId });
  await knex('rating').del().where({ ratingId: rating.ratingId });
};

export default deleteRating;
