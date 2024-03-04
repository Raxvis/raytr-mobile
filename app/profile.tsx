import React from 'react';
import { Text, View } from 'react-native';
import knex from '../db';
const HelloWorld = () => {
  const run = async () => {
    // await knex('score').del();
    // await knex('rating').del();

    const categories = await knex('category');
    const itemCategories = await knex('itemCategory');
    const items = await knex('item');
    const ratings = await knex('rating');
    const scores = await knex('score').where({ ratingId: '831780b0-65a2-40de-b1b5-c355b3b6112f' });
    const ratingSchemas = await knex('ratingSchema');

    // console.log(JSON.stringify(categories, null, 2));
    // console.log(JSON.stringify(itemCategories, null, 2));
    // console.log(JSON.stringify(items, null, 2));
    console.log(JSON.stringify(ratings, null, 2));
    console.log(JSON.stringify(scores, null, 2));
    // console.log(JSON.stringify(ratingSchemas, null, 2));
  };

  run();

  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

export default HelloWorld;
