import { SQLiteDatabase } from 'expo-sqlite/next';
import createCategoryItemTable from './migrations/createCategoryItemTable';
import createCategoryTable from './migrations/createCategoryTable';
import createItemTable from './migrations/createItemTable';
import createRatingMetricTable from './migrations/createRatingMetricTable';
import createRatingTable from './migrations/createRatingTable';
import createScoreTable from './migrations/createScoreTable';

const migrate = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 2;
  const { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion < 2) {
    await db.execAsync('PRAGMA journal_mode = WAL');
    await db.execAsync('PRAGMA foreign_keys = ON');
    await db.execAsync('DROP TABLE IF EXISTS score');
    await db.execAsync('DROP TABLE IF EXISTS rating');
    await db.execAsync('DROP TABLE IF EXISTS ratingMetric');
    await db.execAsync('DROP TABLE IF EXISTS item');
    await db.execAsync('DROP TABLE IF EXISTS category');

    await createCategoryTable(db);
    await createCategoryItemTable(db);
    await createItemTable(db);
    await createRatingTable(db);
    await createScoreTable(db);
    await createRatingMetricTable(db);
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
};

export default migrate;
