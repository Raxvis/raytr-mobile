import { SQLiteDatabase } from 'expo-sqlite/next';

const createRatingMetricTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ratingMetric (
      ratingMetricId TEXT PRIMARY KEY NOT NULL,
      ratingMetricName TEXT NOT NULL
    );
  `);
};

export default createRatingMetricTable;
