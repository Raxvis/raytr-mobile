import { SQLiteDatabase } from 'expo-sqlite/next';

const createScoreTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS score (
      scoreId TEXT PRIMARY KEY NOT NULL,
      ratingId TEXT NOT NULL,
      scoreValue INTEGER NOT NULL,
      ratingMetricId TEXT NOT NULL,
      FOREIGN KEY(ratingId) REFERENCES rating(ratingId),
      FOREIGN KEY(ratingMetricId) REFERENCES ratingMetric(ratingMetricId)
    );
  `);
};

export default createScoreTable;
