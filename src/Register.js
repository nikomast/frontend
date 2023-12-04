
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
    const response = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password1, password2}),
    });
  
    if (response.ok) {
      //console.log('Registration successful');
      navigate('/'); // Redirect to login page
    } else {
      setErrorMessage('Registeration failed. Please check the information.');
    }
  };

  return (
    <div className="App-header">
      <h1>Input your information</h1>
      <div className='form-container'>
      <form onSubmit={handleRegister} className="profile-form">
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
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Sign-up!</button>
        <BackButton />
      </form>
      </div>
    </div>
  );
}

export default Register;
