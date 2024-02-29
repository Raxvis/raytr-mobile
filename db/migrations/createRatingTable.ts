import { SQLiteDatabase } from 'expo-sqlite/next';

const createRatingTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS rating (
      ratingId TEXT PRIMARY KEY NOT NULL,
      categoryId TEXT NOT NULL,
      itemId TEXT NOT NULL,
      itemCost REAL,
      ratingTotal REAL,
      ratingNotes TEXT,
      ratingTime INTEGER,
      FOREIGN KEY(categoryId) REFERENCES category(categoryId),
      FOREIGN KEY(itemId) REFERENCES item(itemId)
    );
  `);
};

export default createRatingTable;
