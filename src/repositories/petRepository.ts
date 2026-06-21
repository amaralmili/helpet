import { SQLiteDatabase } from "expo-sqlite";
import { Pet } from "../types/pet";

export async function listarPets(db: SQLiteDatabase): Promise<Pet[]> {
  return await db.getAllAsync<Pet>("SELECT * FROM pets ORDER BY id DESC;");
}

export async function inserirPet(
  db: SQLiteDatabase,
  pet: Omit<Pet, "id" | "status">,
): Promise<void> {
  await db.runAsync(
    "INSERT INTO pets (titulo, descricao, fotoUri, latitude, longitude, status) VALUES (?, ?, ?, ?, ?, ?);",
    [
      pet.titulo,
      pet.descricao,
      pet.fotoUri,
      pet.latitude,
      pet.longitude,
      "perdido",
    ],
  );
}

export async function atualizarPet(
  db: SQLiteDatabase,
  id: number,
  pet: Omit<Pet, "id" | "status">,
): Promise<void> {
  await db.runAsync(
    "UPDATE pets SET titulo = ?, descricao = ?, fotoUri = ?, latitude = ?, longitude = ? WHERE id = ?;",
    [pet.titulo, pet.descricao, pet.fotoUri, pet.latitude, pet.longitude, id],
  );
}

export async function alternarStatusPet(
  db: SQLiteDatabase,
  id: number,
  statusAtual: string,
): Promise<void> {
  const novoStatus = statusAtual === "perdido" ? "encontrado" : "perdido";
  await db.runAsync("UPDATE pets SET status = ? WHERE id = ?;", [
    novoStatus,
    id,
  ]);
}

export async function excluirPet(
  db: SQLiteDatabase,
  id: number,
): Promise<void> {
  await db.runAsync("DELETE FROM pets WHERE id = ?;", [id]);
}
