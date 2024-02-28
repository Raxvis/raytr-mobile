import { SQLiteDatabase } from 'expo-sqlite/next';

const createCategoryTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS category (
      categoryId TEXT PRIMARY KEY NOT NULL,
      categoryName TEXT NOT NULL,
      categoryDescription TEXT
    );
  `);
};

export default createCategoryTable;
