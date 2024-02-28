import { SQLiteDatabase } from 'expo-sqlite/next';

const createRatingSchemaTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ratingSchema (
      ratingSchemaId TEXT PRIMARY KEY NOT NULL,
      categoryId TEXT NOT NULL,
      ratingSchemaName TEXT NOT NULL,
      FOREIGN KEY(categoryId) REFERENCES category(categoryId)
    );
  `);
};

export default createRatingSchemaTable;
