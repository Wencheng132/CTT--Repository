const express = require('express');
const bcrypt = require('bcryptjs');
const { getDb, saveDb } = require('../db');
const { generateToken } = require('../auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: '用户名和密码不能为空' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: '密码至少6位' });
  }

  const db = await getDb();

  const existing = db.exec('SELECT id FROM users WHERE username = ?', [username]);
  if (existing.length > 0 && existing[0].values.length > 0) {
    return res.status(400).json({ error: '用户名已存在' });
  }

  const hashed = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]);
  saveDb();

  const result = db.exec('SELECT last_insert_rowid() as id');
  const userId = result[0].values[0][0];
  const token = generateToken(userId);

  res.json({ token, userId, username });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: '用户名和密码不能为空' });
  }

  const db = await getDb();

  const rows = db.exec('SELECT id, password FROM users WHERE username = ?', [username]);
  if (rows.length === 0 || rows[0].values.length === 0) {
    return res.status(400).json({ error: '用户名或密码错误' });
  }

  const [userId, hashed] = rows[0].values[0];
  const match = await bcrypt.compare(password, hashed);
  if (!match) {
    return res.status(400).json({ error: '用户名或密码错误' });
  }

  const token = generateToken(userId);
  res.json({ token, userId, username });
});

module.exports = router;
