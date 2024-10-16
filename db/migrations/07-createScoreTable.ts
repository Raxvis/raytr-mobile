import { SQLiteDatabase } from 'expo-sqlite/next';

export const up = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS score (
      scoreId TEXT PRIMARY KEY NOT NULL,
      ratingId TEXT NOT NULL,
      score INTEGER NOT NULL,
      ratingMetricId TEXT NOT NULL,

      FOREIGN KEY(ratingId) REFERENCES rating(ratingId),
      FOREIGN KEY(ratingMetricId) REFERENCES ratingMetric(ratingMetricId)
    );
  `);
};

export const down = async (db: SQLiteDatabase) => {
  await db.execAsync('DROP TABLE IF EXISTS score');
};
