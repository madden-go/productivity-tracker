import { getPool } from '../db.js';

export default async function handler(req, res) {
  const pool = getPool();
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const { user_id, q } = req.query;
    if (!q) return res.json([]);
    const result = await pool.query(
      `SELECT * FROM journals WHERE user_id = $1 AND entry ILIKE $2 ORDER BY date DESC LIMIT 10`,
      [user_id, `%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
