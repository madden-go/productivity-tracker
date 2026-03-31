import { getPool } from './db.js';

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'GET') {
    try {
      const { user_id } = req.query;
      const result = await pool.query('SELECT * FROM habits WHERE user_id = $1', [user_id]);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { user_id, name } = req.body;
      const result = await pool.query(
        'INSERT INTO habits (user_id, name, streak, completed) VALUES ($1, $2, 0, FALSE) RETURNING *',
        [user_id, name]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).end();
  }
}
