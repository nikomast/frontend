// src/Login.js
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await onLogin(username, password);
    if (success) {
      navigate('/Content'); // Redirect to profile on successful login
    } else {
      // Handle login failure (e.g., show an error message)
    }
  };

  return (
    <div className="App-header">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <div><Link to="/">Back to main page!</Link></div>
      <div><Link to="/sign-up">Sign-up!</Link></div>
      <div><Link to="/reset-password">Forgot Password?</Link></div>
    </div>
  );
}

export default Login;