import knex from '../../db';

const getAllCategories = async () => await knex('category');

export default getAllCategories;
