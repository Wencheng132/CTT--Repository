const express = require('express');
const { getDb, saveDb } = require('../db');
const { authMiddleware } = require('../auth');

const router = express.Router();

router.use(authMiddleware);

// 获取所有任务（按优先级降序）
router.get('/', async (req, res) => {
  const db = await getDb();
  const result = db.exec(
    'SELECT id, title, description, priority, completed, created_at FROM todos WHERE user_id = ? ORDER BY completed ASC, priority DESC, created_at DESC',
    [req.userId]
  );

  const todos = result.length > 0 ? result[0].values.map(row => ({
    id: row[0],
    title: row[1],
    description: row[2],
    priority: row[3],
    completed: row[4],
    created_at: row[5],
  })) : [];

  res.json(todos);
});

// 创建任务
router.post('/', async (req, res) => {
  const { title, description, priority } = req.body;

  if (!title) {
    return res.status(400).json({ error: '任务标题不能为空' });
  }

  const db = await getDb();
  db.run(
    'INSERT INTO todos (user_id, title, description, priority) VALUES (?, ?, ?, ?)',
    [req.userId, title, description || '', priority || 0]
  );
  saveDb();

  const result = db.exec('SELECT last_insert_rowid() as id');
  const id = result[0].values[0][0];

  res.status(201).json({ id, title, description: description || '', priority: priority || 0, completed: 0 });
});

// 更新任务
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, completed } = req.body;

  const db = await getDb();

  const rows = db.exec('SELECT id FROM todos WHERE id = ? AND user_id = ?', [id, req.userId]);
  if (rows.length === 0 || rows[0].values.length === 0) {
    return res.status(404).json({ error: '任务不存在' });
  }

  const updates = [];
  const values = [];

  if (title !== undefined) { updates.push('title = ?'); values.push(title); }
  if (description !== undefined) { updates.push('description = ?'); values.push(description); }
  if (priority !== undefined) { updates.push('priority = ?'); values.push(priority); }
  if (completed !== undefined) { updates.push('completed = ?'); values.push(completed); }

  if (updates.length > 0) {
    values.push(id, req.userId);
    db.run(`UPDATE todos SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`, values);
    saveDb();
  }

  res.json({ success: true });
});

// 删除任务
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const db = await getDb();
  const rows = db.exec('SELECT id FROM todos WHERE id = ? AND user_id = ?', [id, req.userId]);
  if (rows.length === 0 || rows[0].values.length === 0) {
    return res.status(404).json({ error: '任务不存在' });
  }

  db.run('DELETE FROM todos WHERE id = ? AND user_id = ?', [id, req.userId]);
  saveDb();

  res.json({ success: true });
});

module.exports = router;
