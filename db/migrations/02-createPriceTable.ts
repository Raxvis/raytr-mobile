import { SQLiteDatabase } from 'expo-sqlite/next';

export const up = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS price (
      priceId TEXT PRIMARY KEY NOT NULL,
      itemId TEXT NOT NULL,
      location TEXT,
      price REAL,

      FOREIGN KEY(itemId) REFERENCES item(itemId)
    );
  `);
};

export const down = async (db: SQLiteDatabase) => {
  await db.execAsync('DROP TABLE IF EXISTS price');
};
