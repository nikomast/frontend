// src/Login.js
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await onLogin(username, password);
    if (success) {
      navigate('/Content'); // Redirect to profile on successful login
    } else {
        setLoginError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="App-header">
        <h1>Login</h1>
      <div className='form-container'>
      <form onSubmit={handleSubmit} className='profile-form'>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="demo"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="demo"
          required
        />
        {loginError && <div className="error-message">{loginError}</div>}
        <button type="submit">Login</button>
      </form>
      <div className="centered-links">
        <Link to="/">Main Page</Link>
        <Link to="/sign-up">Sign Up</Link>
        <Link to="/reset-password">Forgot Password</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
