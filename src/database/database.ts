import { SQLiteDatabase } from "expo-sqlite";

export async function inicializarBanco(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      fotoUri TEXT,
      latitude REAL,
      longitude REAL,
      status TEXT DEFAULT 'perdido'
    );
  `);
}
