import { SQLiteDatabase } from 'expo-sqlite/next';
import createCategoryTable from './migrations/createCategoryTable';
import createRatingSchemaTable from './migrations/createRatingSchemaTable';
import createItemTable from './migrations/createItemTable';
import createRatingTable from './migrations/createRatingTable';
import createScoreTable from './migrations/createScoreTable';

const migrate = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 1;
  const { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync('PRAGMA journal_mode = WAL');
    await db.execAsync('PRAGMA foreign_keys = ON');
    await db.execAsync('DROP TABLE IF EXISTS score');
    await db.execAsync('DROP TABLE IF EXISTS rating');

    await createCategoryTable(db);
    await createRatingSchemaTable(db);
    await createItemTable(db);
    await createRatingTable(db);
    await createScoreTable(db);
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
};

export default migrate;
