import { SQLiteDatabase } from 'expo-sqlite/next';

export const up = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS category (
      categoryId TEXT PRIMARY KEY NOT NULL,
      categoryName TEXT NOT NULL
    );
  `);
};

export const down = async (db: SQLiteDatabase) => {
  await db.execAsync('DROP TABLE IF EXISTS category');
};
