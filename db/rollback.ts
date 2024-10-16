import { SQLiteDatabase } from 'expo-sqlite/next';
import migrations from './migrations';

const rollback = async (db: SQLiteDatabase) => {
  const { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');

  console.log(`Current DB version: ${currentDbVersion}`);

  // Rollback migrations
  for (let i = currentDbVersion - 1; i >= 0; i--) {
    console.log(`Rolling back migration ${i}`);
    await migrations[i].down(db);
    await db.execAsync(`PRAGMA user_version = ${i}`);
  }
};

export default rollback;
