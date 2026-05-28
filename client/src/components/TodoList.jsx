import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

export default function TodoList({ user, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleCreate(todoData) {
    await createTodo(todoData);
    setShowForm(false);
    loadTodos();
  }

  async function handleUpdate(id, updates) {
    await updateTodo(id, updates);
    loadTodos();
  }

  async function handleDelete(id) {
    if (!confirm('确定删除这个任务吗？')) return;
    await deleteTodo(id);
    loadTodos();
  }

  function handleEdit(todo) {
    setEditTodo(todo);
    setShowForm(true);
  }

  function handleFormSubmit(todoData) {
    if (editTodo) {
      handleUpdate(editTodo.id, todoData);
    } else {
      handleCreate(todoData);
    }
    setEditTodo(null);
  }

  function handleFormCancel() {
    setShowForm(false);
    setEditTodo(null);
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const counts = {
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  const priorityLabels = { 0: '普通', 1: '低优先', 2: '中优先', 3: '高优先' };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">任务管理器</h1>
            <p className="text-sm text-gray-500">欢迎，{user.username}</p>
          </div>
          <button
            onClick={onLogout}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            退出登录
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4">
          {(['all', 'active', 'completed']).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {f === 'all' ? `全部 (${counts.all})` : f === 'active' ? `待完成 (${counts.active})` : `已完成 (${counts.completed})`}
            </button>
          ))}
        </div>

        {/* Todo form */}
        {showForm && (
          <TodoForm
            initial={editTodo}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}

        {/* Add button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-500 transition mb-4 font-medium"
          >
            + 添加新任务
          </button>
        )}

        {/* Todo list */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-12">
              {filter === 'all' ? '还没有任务，点击上方按钮添加' : '没有符合条件的任务'}
            </p>
          ) : (
            filtered.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={(completed) => handleUpdate(todo.id, { completed: completed ? 1 : 0 })}
                onEdit={() => handleEdit(todo)}
                onDelete={() => handleDelete(todo.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
