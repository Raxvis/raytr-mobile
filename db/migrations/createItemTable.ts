import { SQLiteDatabase } from 'expo-sqlite/next';

const createItemTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS item (
      itemId TEXT PRIMARY KEY NOT NULL,
      itemName TEXT NOT NULL,
      itemPicture TEXT,
      itemDescription TEXT,
      itemCost REAL
    );
  `);
};

export default createItemTable;
