import { getPool } from '../db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { email, password } = req.body;
    const pool = getPool();
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(400).json({ success: false, message: 'Invalid username (email not found)' });
    if (user.password !== password) return res.status(400).json({ success: false, message: 'Incorrect password' });
    const { password: _, ...userInfo } = user;
    res.json({ success: true, user: userInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
