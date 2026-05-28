const API = '/api';

function token() {
  return localStorage.getItem('token');
}

function headers() {
  const h = { 'Content-Type': 'application/json' };
  if (token()) h['Authorization'] = `Bearer ${token()}`;
  return h;
}

async function request(url, options = {}) {
  const res = await fetch(`${API}${url}`, { headers: headers(), ...options });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '请求失败');
  return data;
}

export async function register(username, password) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function login(username, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function getTodos() {
  return request('/todos');
}

export async function createTodo(todo) {
  return request('/todos', {
    method: 'POST',
    body: JSON.stringify(todo),
  });
}

export async function updateTodo(id, updates) {
  return request(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function deleteTodo(id) {
  return request(`/todos/${id}`, { method: 'DELETE' });
}
