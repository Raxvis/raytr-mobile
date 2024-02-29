import knex from '../../db';

const upsertItem = async (item) => {
  const previousItem = await knex('item').where({ itemId: item.itemId }).first();

  if (previousItem) {
    await knex('item').update(item).where({ itemId: item.itemId });
  } else {
    await knex('item').insert(item);
  }
};

export default upsertItem;
