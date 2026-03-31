import { getPool } from './db.js';

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'GET') {
    try {
      const { user_id, date } = req.query;
      if (date) {
        const result = await pool.query(
          'SELECT * FROM journals WHERE user_id = $1 AND date = $2',
          [user_id, date]
        );
        res.json(result.rows[0] || null);
      } else {
        const result = await pool.query(
          'SELECT * FROM journals WHERE user_id = $1 ORDER BY date DESC',
          [user_id]
        );
        res.json(result.rows);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { user_id, entry, date } = req.body;
      await pool.query(
        `INSERT INTO journals (user_id, entry, date) VALUES ($1, $2, $3)
         ON CONFLICT (user_id, date) DO UPDATE SET entry = EXCLUDED.entry`,
        [user_id, entry, date]
      );
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).end();
  }
}
