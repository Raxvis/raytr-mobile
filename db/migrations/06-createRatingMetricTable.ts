import { SQLiteDatabase } from 'expo-sqlite/next';

export const up = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ratingMetric (
      ratingMetricId TEXT PRIMARY KEY NOT NULL,
      ratingMetricName TEXT NOT NULL
    );
  `);
};

export const down = async (db: SQLiteDatabase) => {
  await db.execAsync('DROP TABLE IF EXISTS ratingMetric');
};
