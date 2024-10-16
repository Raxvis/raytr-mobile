import ExpoSQLiteDialect from '@expo/knex-expo-sqlite-dialect';
import Knex from 'knex';

const knex = Knex({
  client: ExpoSQLiteDialect,
  connection: {
    filename: 'raytr.db',
  },
  useNullAsDefault: true,
});

export default knex;
