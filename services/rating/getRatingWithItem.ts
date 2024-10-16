import knex from '../../db';
import { Item, Rating } from '../../types';

const getRatingWithItem = async (): Promise<(Item & Rating)[]> =>
  knex({ r: 'rating' })
    .select('i.*', 'r.*')
    .join({ i: 'item' }, 'i.itemId', '=', 'r.itemId')
    .orderBy('ratingTime', 'desc')
    .limit(100);

export default getRatingWithItem;
