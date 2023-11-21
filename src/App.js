import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';
import Profile from './Profile';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import Content from './Content';
import PasswordResetRequest from './PassWordResetRequest';
import PasswordResetConfirm from './PasswordResetConfirm';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username, password) => {
    const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.access);  // Store the token
        setIsLoggedIn(true);
        console.log('Login successful');
    } else {
        console.error('Login failed');
        // Handle error, show message to user
    }
};


useEffect(() => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
      validateToken(authToken).then(isValid => {
          if (isValid) {
              setIsLoggedIn(true);
          } else {
              localStorage.removeItem('authToken');
              setIsLoggedIn(false);
          }
      });
  } 
}, []);

const validateToken = async (token) => {
  try {
      const response = await fetch('http://localhost:8000/api/validate-token/', {
          headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.ok;
  } catch (error) {
      console.error("Token validation error:", error);
      return false;
  }
};


return (
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate replace to="/content" />} />
      <Route path="/profile" element={isLoggedIn ? <Profile setIsLoggedIn={setIsLoggedIn} /> : <Navigate replace to="/" />} />
      <Route path="/content" element={isLoggedIn ? <Content /> : <Navigate replace to="/login" />} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/reset-password" element={<PasswordResetRequest />} />
      <Route path="/reset-password/:uid/:token" element={<PasswordResetConfirm />} />
    </Routes>
  </Router>
);

}

export default App;
