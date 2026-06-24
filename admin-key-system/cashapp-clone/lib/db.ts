import { Pool } from "pg"

declare global {
  // eslint-disable-next-line no-var
  var _cashPool: Pool | undefined
}

// Reuse a single pool across hot reloads in dev.
export const pool =
  global._cashPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  })

if (process.env.NODE_ENV !== "production") {
  global._cashPool = pool
}

export async function query<T = any>(text: string, params: any[] = []): Promise<T[]> {
  const res = await pool.query(text, params)
  return res.rows as T[]
}
