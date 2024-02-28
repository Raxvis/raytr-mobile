import { SQLiteDatabase } from 'expo-sqlite/next';

const createScoreTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS rating (
      scoreId TEXT PRIMARY KEY NOT NULL,
      ratingId TEXT NOT NULL,
      ratingSchemaId TEXT NOT NULL,
      scoreValue INTEGER NOT NULL,
      FOREIGN KEY(ratingId) REFERENCES rating(ratingId),
      FOREIGN KEY(ratingSchemaId) REFERENCES ratingSchema(ratingSchemaId)
    );
  `);
};

export default createScoreTable;
