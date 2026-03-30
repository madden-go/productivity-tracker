import { initDB, getDB } from './database.js';

async function test() {
  await initDB();
  const db = getDB();
  const res = await db.run('INSERT INTO tasks (user_id, text, completed) VALUES (?, ?, 0)', [1, "Test Task"]);
  console.log("res:", res);
  const task = await db.get('SELECT * FROM tasks WHERE id = ?', [res.lastID]);
  console.log("task:", task);
}
test().catch(console.error);
