import { SQLiteDatabase } from 'expo-sqlite/next';

export const up = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS itemCategory (
      itemId TEXT NOT NULL,
      categoryId TEXT NOT NULL,
      PRIMARY KEY (itemId, categoryId),
      FOREIGN KEY(itemId) REFERENCES item(itemId),
      FOREIGN KEY(categoryId) REFERENCES category(categoryId)
    );
  `);
};

export const down = async (db: SQLiteDatabase) => {
  await db.execAsync('DROP TABLE IF EXISTS itemCategory');
};
