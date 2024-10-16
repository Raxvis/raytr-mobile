import knex from '../../db';

const upsertItem = async (item) => {
  const { categoryIds, ...itemData } = item;
  await knex('item').insert(itemData).onConflict('itemId').merge();

  await knex('itemCategory').where({ itemId: item.itemId }).delete();
  await knex('itemCategory').insert(categoryIds.map((categoryId) => ({ itemId: item.itemId, categoryId })));
};

export default upsertItem;
