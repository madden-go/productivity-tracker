import { getPool } from '../db.js';

export default async function handler(req, res) {
  const pool = getPool();
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { completed, streak } = req.body;
      await pool.query(
        'UPDATE habits SET completed = $1, streak = $2 WHERE id = $3',
        [completed, streak, id]
      );
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM habits WHERE id = $1', [id]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).end();
  }
}
