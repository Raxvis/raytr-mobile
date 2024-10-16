import knex from '../../db';

const getItemWithCategoryIds = async (itemId) => {
  if (!itemId) {
    return undefined;
  }

  const item = await knex('item').where({ itemId }).first();

  if (!item) {
    return undefined;
  }

  const categoryIds = await knex({ c: 'category' })
    .join({ ic: 'itemCategory' }, 'ic.categoryId', 'c.categoryId')
    .where({ 'ic.itemId': itemId })
    .pluck('c.categoryId');

  return {
    ...item,
    categoryIds,
  };
};

export default getItemWithCategoryIds;
