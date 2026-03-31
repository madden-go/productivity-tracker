import { getPool } from './db.js';

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'GET') {
    try {
      const { user_id } = req.query;
      const result = await pool.query('SELECT * FROM subjects WHERE user_id = $1', [user_id]);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { user_id, name, color } = req.body;
      const result = await pool.query(
        'INSERT INTO subjects (user_id, name, color) VALUES ($1, $2, $3) RETURNING *',
        [user_id, name, color]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).end();
  }
}
