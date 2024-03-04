import { SQLiteDatabase } from 'expo-sqlite/next';

const createRatingTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS rating (
      ratingId TEXT PRIMARY KEY NOT NULL,
      itemId TEXT NOT NULL,
      itemCost REAL,
      ratingNotes TEXT,
      ratingTime INTEGER,
      overallRating INTEGER,
      compositeRating REAL,
      FOREIGN KEY(itemId) REFERENCES item(itemId)
    );
  `);
};

export default createRatingTable;
