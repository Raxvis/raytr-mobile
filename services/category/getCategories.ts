import knex from '../../db';

const getCategories = () => knex('category');

export default getCategories;
