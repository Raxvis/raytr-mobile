import knex from '../../db';

const getAllItems = async () => await knex('item');

export default getAllItems;
