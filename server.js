import express from 'express';
import cors from 'cors';
import { initDB, getDB } from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

initDB().then(() => {
  console.log("SQLite database initialized successfully.");

  // --- Auth Routes ---
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const db = getDB();
      const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);
      if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });
      
      const result = await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
      res.json({ success: true, user: { id: result.lastID, name, email }});
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const db = getDB();
      const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
      
      if (!user) return res.status(400).json({ success: false, message: 'Invalid username (email not found)' });
      if (user.password !== password) return res.status(400).json({ success: false, message: 'Incorrect password' });
      
      const { password: _, ...userInfo } = user;
      res.json({ success: true, user: userInfo });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  // --- Tasks Routes ---
  app.get('/api/tasks', async (req, res) => {
    try {
      const { user_id } = req.query;
      const db = getDB();
      const tasks = await db.all('SELECT * FROM tasks WHERE user_id = ?', [user_id]);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/tasks', async (req, res) => {
    try {
      const { user_id, text } = req.body;
      const db = getDB();
      const result = await db.run('INSERT INTO tasks (user_id, text, completed) VALUES (?, ?, 0)', [user_id, text]);
      const newTask = await db.get('SELECT * FROM tasks WHERE id = ?', [result.lastID]);
      res.json(newTask);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { completed } = req.body;
      const db = getDB();
      await db.run('UPDATE tasks SET completed = ? WHERE id = ?', [completed ? 1 : 0, id]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const db = getDB();
      await db.run('DELETE FROM tasks WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Habits Routes ---
  app.get('/api/habits', async (req, res) => {
    try {
      const { user_id } = req.query;
      const db = getDB();
      const habits = await db.all('SELECT * FROM habits WHERE user_id = ?', [user_id]);
      res.json(habits);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/habits', async (req, res) => {
    try {
      const { user_id, name } = req.body;
      const db = getDB();
      const result = await db.run('INSERT INTO habits (user_id, name, streak, completed) VALUES (?, ?, 0, 0)', [user_id, name]);
      const newHabit = await db.get('SELECT * FROM habits WHERE id = ?', [result.lastID]);
      res.json(newHabit);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/habits/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { completed, streak } = req.body;
      const db = getDB();
      await db.run('UPDATE habits SET completed = ?, streak = ? WHERE id = ?', [completed ? 1 : 0, streak, id]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/habits/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const db = getDB();
      await db.run('DELETE FROM habits WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Mood Routes ---
  app.get('/api/moods', async (req, res) => {
    try {
      const { user_id, date } = req.query;
      const db = getDB();
      if (date) {
        const mood = await db.get('SELECT * FROM moods WHERE user_id = ? AND date = ?', [user_id, date]);
        res.json(mood || null);
      } else {
        const moods = await db.all('SELECT * FROM moods WHERE user_id = ? ORDER BY date DESC', [user_id]);
        res.json(moods);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/moods', async (req, res) => {
    try {
      const { user_id, mood, date } = req.body;
      const db = getDB();
      // Insert or replace
      await db.run(`INSERT INTO moods (user_id, mood, date) VALUES (?, ?, ?) 
                    ON CONFLICT(user_id, date) DO UPDATE SET mood = excluded.mood`, 
                    [user_id, mood, date]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Subjects / Courses Routes ---
  app.get('/api/subjects', async (req, res) => {
    try {
      const { user_id } = req.query;
      const db = getDB();
      const subjects = await db.all('SELECT * FROM subjects WHERE user_id = ?', [user_id]);
      res.json(subjects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/subjects', async (req, res) => {
    try {
      const { user_id, name, color } = req.body;
      const db = getDB();
      const result = await db.run('INSERT INTO subjects (user_id, name, color) VALUES (?, ?, ?)', [user_id, name, color]);
      const newSubject = await db.get('SELECT * FROM subjects WHERE id = ?', [result.lastID]);
      res.json(newSubject);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.delete('/api/subjects/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const db = getDB();
      await db.run('DELETE FROM subjects WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Reminders Routes ---
  app.get('/api/reminders', async (req, res) => {
    try {
      const { user_id } = req.query;
      const db = getDB();
      const reminders = await db.all('SELECT * FROM reminders WHERE user_id = ?', [user_id]);
      res.json(reminders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/reminders', async (req, res) => {
    try {
      const { user_id, title, due_date } = req.body;
      const db = getDB();
      const result = await db.run('INSERT INTO reminders (user_id, title, due_date) VALUES (?, ?, ?)', [user_id, title, due_date]);
      const newReminder = await db.get('SELECT * FROM reminders WHERE id = ?', [result.lastID]);
      res.json(newReminder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.delete('/api/reminders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const db = getDB();
      await db.run('DELETE FROM reminders WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Journal Routes ---
  app.get('/api/journals', async (req, res) => {
    try {
      const { user_id, date } = req.query;
      const db = getDB();
      if (date) {
        const journal = await db.get('SELECT * FROM journals WHERE user_id = ? AND date = ?', [user_id, date]);
        res.json(journal || null);
      } else {
        const journals = await db.all('SELECT * FROM journals WHERE user_id = ? ORDER BY date DESC', [user_id]);
        res.json(journals);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/journals', async (req, res) => {
    try {
      const { user_id, entry, date } = req.body;
      const db = getDB();
      await db.run(`INSERT INTO journals (user_id, entry, date) VALUES (?, ?, ?) 
                    ON CONFLICT(user_id, date) DO UPDATE SET entry = excluded.entry`, 
                    [user_id, entry, date]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/journals/search', async (req, res) => {
    try {
      const { user_id, q } = req.query;
      if (!q) return res.json([]);
      const db = getDB();
      const journals = await db.all(`SELECT * FROM journals WHERE user_id = ? AND entry LIKE ? ORDER BY date DESC LIMIT 10`, [user_id, `%${q}%`]);
      res.json(journals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Start Server ---
  app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
}).catch(err => {
    console.error("Failed to initialize database", err);
});
