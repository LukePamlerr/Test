import { sql } from "@vercel/postgres";

export async function getItems() {
  const { rows } = await sql`SELECT * FROM items ORDER BY created_at DESC`;
  return rows;
}

export async function createItem(title: string, description: string) {
  const { rows } = await sql`
    INSERT INTO items (title, description)
    VALUES (${title}, ${description})
    RETURNING *
  `;
  return rows[0];
}

export async function deleteItem(id: number) {
  await sql`DELETE FROM items WHERE id = ${id}`;
}
