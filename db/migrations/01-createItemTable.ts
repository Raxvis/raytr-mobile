import { SQLiteDatabase } from 'expo-sqlite/next';

export const up = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS item (
      itemId TEXT PRIMARY KEY NOT NULL,
      itemName TEXT NOT NULL,
      itemDescription TEXT,
      itemPicture TEXT,
      score REAL
    );
  `);
};

export const down = async (db: SQLiteDatabase) => {
  await db.execAsync('DROP TABLE IF EXISTS item');
};
