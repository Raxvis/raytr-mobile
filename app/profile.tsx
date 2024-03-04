import React from 'react';
import { Text, View } from 'react-native';
import knex from '../db';

const Profile = () => {
  const run = async () => {
    const ratings = await knex('rating');

    console.log(JSON.stringify(ratings, null, 2));
  };

  run();

  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

export default Profile;
