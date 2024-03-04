import knex from '../../db';
import { validate } from 'uuid';
import uuid from '../../utils/uuid';

const upsertItem = async (item, categories = []) => {
  await knex('item').insert(item).onConflict('itemId').merge();

  const newCategories = [];

  for (const category of categories) {
    if (!validate(category)) {
      const categoryId = uuid();

      await knex('category').insert({ categoryId, categoryName: category });
      newCategories.push(categoryId);
    }
  }

  const categoryIds = [...newCategories, ...categories.filter(validate)];

  await knex('itemCategory').where({ itemId: item.itemId }).delete();
  await knex('itemCategory').insert(categoryIds.map((categoryId) => ({ itemId: item.itemId, categoryId })));
};

export default upsertItem;
