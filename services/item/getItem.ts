import knex from '../../db';

const getItem = async (itemId) => {
  if (!itemId) {
    return undefined;
  }

  return await knex('item').where({ itemId }).first();
};

export default getItem;
