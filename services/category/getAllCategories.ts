import knex from '../../db';

const getAllCategories = () => knex('category');

export default getAllCategories;
