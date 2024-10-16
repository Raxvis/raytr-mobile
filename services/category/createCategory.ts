import knex from '../../db';

const createCategory = async (category) => knex('category').insert(category).onConflict('categoryId').merge();

export default createCategory;
