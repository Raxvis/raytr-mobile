import { SQLiteDatabase } from 'expo-sqlite/next';
import migrations from './migrations';

const migrate = async (db: SQLiteDatabase) => {
  const { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');

  console.log(`Current DB version: ${currentDbVersion}`);

  if (!currentDbVersion || currentDbVersion < 2) {
    await db.execAsync('PRAGMA journal_mode = WAL');
    await db.execAsync('PRAGMA foreign_keys = ON');
  }

  for (let i = currentDbVersion; i < migrations.length; i++) {
    console.log(`Migrating ${i}`);
    await migrations[i].up(db);
    await db.execAsync(`PRAGMA user_version = ${i + 1}`);
  }
};

export default migrate;
