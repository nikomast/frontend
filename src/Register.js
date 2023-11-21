
// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

function Register() {
  const [username, setUsername] = useState('');
  const [password1, setPassword] = useState('');
  const [password2, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password1, password2}),
    });
  
    if (response.ok) {
      console.log('Registration successful');
      navigate('/'); // Redirect to login page
    } else {
      console.error('Registration failed');
      const errorData = await response.json();
      setErrorMessage(errorData.detail || 'Registration failed');
    }
  };

  return (
    <div className="App-header">
      <h1>Input your information</h1>
      <form onSubmit={handleRegister}>
      <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
        type="password"
        value={password1}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        />
        <input
        type="password"
        value={password2}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Confirm Password"
        required
        />
        <button type="submit">Sign-up!</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <BackButton />
    </div>
  );
}

export default Register;
