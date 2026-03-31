import { getPool } from '../db.js';

export default async function handler(req, res) {
  const pool = getPool();
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { completed } = req.body;
      await pool.query('UPDATE tasks SET completed = $1 WHERE id = $2', [completed, id]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).end();
  }
}
