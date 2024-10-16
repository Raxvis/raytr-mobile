import { SQLiteDatabase } from 'expo-sqlite/next';

export const up = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS rating (
      ratingId TEXT PRIMARY KEY NOT NULL,
      itemId TEXT NOT NULL,
      ratingNotes TEXT,
      ratingTime INTEGER,
      overallRating INTEGER,
      compositeRating REAL,

      FOREIGN KEY(itemId) REFERENCES item(itemId)
    );
  `);
};

export const down = async (db: SQLiteDatabase) => {
  await db.execAsync('DROP TABLE IF EXISTS rating');
};
