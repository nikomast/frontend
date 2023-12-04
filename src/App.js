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
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('authToken') !== null);


  const handleLogin = async (username, password) => {
    const response = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('authToken', data.access);  // Store the token
        setIsLoggedIn(true);
        console.log("isLoggedIn state in handleLogin: ", isLoggedIn);
        return true;
    } else {
        console.error('Login failed');
        return false;
    }
};


useEffect(() => {
  const authToken = sessionStorage.getItem('authToken');
  if (authToken) {
      validateToken(authToken).then(isValid => {
          if (isValid) {
              setIsLoggedIn(true);
              console.log("isLoggedIn in useEffect: ", isLoggedIn);
          } else {
            sessionStorage.removeItem('authToken');
              setIsLoggedIn(false);
          }
      });
  } 
},);

const validateToken = async (token) => {
  try {
      const response = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/validate-token/', {
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
      <Route path="/profile" element={isLoggedIn ? <Profile setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} /> : <Navigate replace to="/login" />} />
      <Route path="/content" element={isLoggedIn ? <Content isLoggedIn={isLoggedIn} /> : <Navigate replace to="/login" />} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/reset-password" element={<PasswordResetRequest />} />
      <Route path="/reset-password/:uid/:token" element={<PasswordResetConfirm />} />
    </Routes>
  </Router>
);

}

export default App;
