

import { useEffect, useState } from 'react';
import { apiRequest } from './api';
import MediaRoom from './MediaRoom';
import MediaUploadForm from './MediaUploadForm';


function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '', username: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('authToken'));
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    apiRequest('/auth/health')
      .then((data) => setMessage(data.message || 'API connected!'))
      .catch((err) => setError(err.message));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegisterChange = (e) => {
    setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setMessage(data.message || 'Login successful!');
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(registerForm),
      });
      setMessage(data.message || 'Registration successful! Please log in.');
      setShowRegister(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setMessage('Logged out.');
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Insta-clone Frontend</h1>
      <p>Welcome! This is the React frontend for the Insta-clone project.</p>
      <div style={{ margin: '2rem 0', padding: '1rem', background: '#f6f6f6', borderRadius: 8 }}>
        {message && <span style={{ color: 'green' }}>{message}</span>}
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
      {!isLoggedIn && !showRegister && (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="username"
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>
          <button type="submit" disabled={loading} style={{ padding: 10, fontWeight: 600 }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button type="button" onClick={() => setShowRegister(true)} style={{ padding: 8, marginTop: 8 }}>
            Register
          </button>
        </form>
      )}
      {!isLoggedIn && showRegister && (
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={registerForm.username}
              onChange={handleRegisterChange}
              required
              autoComplete="username"
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              required
              autoComplete="email"
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              required
              autoComplete="new-password"
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>
          <button type="submit" disabled={loading} style={{ padding: 10, fontWeight: 600 }}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <button type="button" onClick={() => setShowRegister(false)} style={{ padding: 8, marginTop: 8 }}>
            Back to Login
          </button>
        </form>
      )}
      {isLoggedIn && (
        <>
          <div>
            <p style={{ color: 'blue' }}>You are logged in!</p>
            <button onClick={handleLogout} style={{ padding: 8, marginTop: 8 }}>Logout</button>
          </div>
          <MediaUploadForm onUpload={() => window.location.reload()} />
          <MediaRoom />
        </>
      )}
    </div>
  );
}

export default App;
