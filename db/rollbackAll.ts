import { SQLiteDatabase } from 'expo-sqlite/next';
import migrations from './migrations';

const rollbackAll = async (db: SQLiteDatabase) => {
  // Rollback all migrations
  for (let i = migrations.length - 1; i >= 0; i--) {
    console.log(`Rolling back migration ${i}`);
    await migrations[i].down(db);
    await db.execAsync(`PRAGMA user_version = ${i}`);
  }
};

export default rollbackAll;
