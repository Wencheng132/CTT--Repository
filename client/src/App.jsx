import { useState, useEffect } from 'react';
import Login from './components/Login';
import TodoList from './components/TodoList';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username });
    }
  }, []);

  function handleLogin(userData) {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('username', userData.username);
    setUser({ username: userData.username });
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return <TodoList user={user} onLogout={handleLogout} />;
}
