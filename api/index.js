import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

let pool;
function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('neon')
        ? { rejectUnauthorized: false }
        : false,
    });
  }
  return pool;
}

// --- Init DB ---
app.get('/api/init-db', async (req, res) => {
  try {
    const db = getPool();
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        text TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT FALSE
      );
      CREATE TABLE IF NOT EXISTS habits (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        name TEXT NOT NULL,
        streak INTEGER NOT NULL DEFAULT 0,
        completed BOOLEAN NOT NULL DEFAULT FALSE
      );
      CREATE TABLE IF NOT EXISTS moods (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        mood TEXT NOT NULL,
        date TEXT NOT NULL,
        UNIQUE(user_id, date)
      );
      CREATE TABLE IF NOT EXISTS subjects (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        name TEXT NOT NULL,
        color TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS reminders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        title TEXT NOT NULL,
        due_date TEXT
      );
      CREATE TABLE IF NOT EXISTS journals (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        entry TEXT NOT NULL,
        date TEXT NOT NULL,
        UNIQUE(user_id, date)
      );
    `);
    res.json({ success: true, message: 'Database tables initialized successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- Auth ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const db = getPool();
    const existing = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0)
      return res.status(400).json({ success: false, message: 'User already exists' });
    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password]
    );
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getPool();
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(400).json({ success: false, message: 'Invalid username (email not found)' });
    if (user.password !== password) return res.status(400).json({ success: false, message: 'Incorrect password' });
    const { password: _, ...userInfo } = user;
    res.json({ success: true, user: userInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- Tasks ---
app.get('/api/tasks', async (req, res) => {
  try {
    const { user_id } = req.query;
    const result = await getPool().query('SELECT * FROM tasks WHERE user_id = $1', [user_id]);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { user_id, text } = req.body;
    const result = await getPool().query(
      'INSERT INTO tasks (user_id, text, completed) VALUES ($1, $2, FALSE) RETURNING *',
      [user_id, text]
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { completed } = req.body;
    await getPool().query('UPDATE tasks SET completed = $1 WHERE id = $2', [completed, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await getPool().query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- Habits ---
app.get('/api/habits', async (req, res) => {
  try {
    const { user_id } = req.query;
    const result = await getPool().query('SELECT * FROM habits WHERE user_id = $1', [user_id]);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/habits', async (req, res) => {
  try {
    const { user_id, name } = req.body;
    const result = await getPool().query(
      'INSERT INTO habits (user_id, name, streak, completed) VALUES ($1, $2, 0, FALSE) RETURNING *',
      [user_id, name]
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/habits/:id', async (req, res) => {
  try {
    const { completed, streak } = req.body;
    await getPool().query(
      'UPDATE habits SET completed = $1, streak = $2 WHERE id = $3',
      [completed, streak, req.params.id]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/habits/:id', async (req, res) => {
  try {
    await getPool().query('DELETE FROM habits WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- Moods ---
app.get('/api/moods', async (req, res) => {
  try {
    const { user_id, date } = req.query;
    if (date) {
      const result = await getPool().query(
        'SELECT * FROM moods WHERE user_id = $1 AND date = $2', [user_id, date]
      );
      res.json(result.rows[0] || null);
    } else {
      const result = await getPool().query(
        'SELECT * FROM moods WHERE user_id = $1 ORDER BY date DESC', [user_id]
      );
      res.json(result.rows);
    }
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/moods', async (req, res) => {
  try {
    const { user_id, mood, date } = req.body;
    await getPool().query(
      `INSERT INTO moods (user_id, mood, date) VALUES ($1, $2, $3)
       ON CONFLICT (user_id, date) DO UPDATE SET mood = EXCLUDED.mood`,
      [user_id, mood, date]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- Subjects ---
app.get('/api/subjects', async (req, res) => {
  try {
    const { user_id } = req.query;
    const result = await getPool().query('SELECT * FROM subjects WHERE user_id = $1', [user_id]);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/subjects', async (req, res) => {
  try {
    const { user_id, name, color } = req.body;
    const result = await getPool().query(
      'INSERT INTO subjects (user_id, name, color) VALUES ($1, $2, $3) RETURNING *',
      [user_id, name, color]
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/subjects/:id', async (req, res) => {
  try {
    await getPool().query('DELETE FROM subjects WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- Reminders ---
app.get('/api/reminders', async (req, res) => {
  try {
    const { user_id } = req.query;
    const result = await getPool().query('SELECT * FROM reminders WHERE user_id = $1', [user_id]);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/reminders', async (req, res) => {
  try {
    const { user_id, title, due_date } = req.body;
    const result = await getPool().query(
      'INSERT INTO reminders (user_id, title, due_date) VALUES ($1, $2, $3) RETURNING *',
      [user_id, title, due_date]
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/reminders/:id', async (req, res) => {
  try {
    await getPool().query('DELETE FROM reminders WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- Journals ---
app.get('/api/journals/search', async (req, res) => {
  try {
    const { user_id, q } = req.query;
    if (!q) return res.json([]);
    const result = await getPool().query(
      `SELECT * FROM journals WHERE user_id = $1 AND entry ILIKE $2 ORDER BY date DESC LIMIT 10`,
      [user_id, `%${q}%`]
    );
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/journals', async (req, res) => {
  try {
    const { user_id, date } = req.query;
    if (date) {
      const result = await getPool().query(
        'SELECT * FROM journals WHERE user_id = $1 AND date = $2', [user_id, date]
      );
      res.json(result.rows[0] || null);
    } else {
      const result = await getPool().query(
        'SELECT * FROM journals WHERE user_id = $1 ORDER BY date DESC', [user_id]
      );
      res.json(result.rows);
    }
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/journals', async (req, res) => {
  try {
    const { user_id, entry, date } = req.body;
    await getPool().query(
      `INSERT INTO journals (user_id, entry, date) VALUES ($1, $2, $3)
       ON CONFLICT (user_id, date) DO UPDATE SET entry = EXCLUDED.entry`,
      [user_id, entry, date]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default app;
