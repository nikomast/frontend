import './App.css';

import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Profile({setIsLoggedIn }) {
  const navigate = useNavigate();
  const [deletePassword, setDeletePassword] = useState('');

  const confirmAndDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        handleDeleteAccount(deletePassword);
    }
};

const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');
const [changePasswordMessage, setChangePasswordMessage] = useState('');
const [userData, setUserData] = useState({ username: '', email: '' });
const [newUsername, setNewUsername] = useState('');
const [newEmail, setNewEmail] = useState('');

const handlePasswordChange = async (event) => {
  event.preventDefault();
  if (newPassword !== confirmNewPassword) {
    setChangePasswordMessage('New passwords do not match.');
    return;
  }

  // Call the function to change the password
  const success = await onChangePassword(currentPassword, newPassword);
  if (success) {
    setChangePasswordMessage('Password successfully changed.');
  } else {
    setChangePasswordMessage('Failed to change password.');
  }
};

useEffect(() => {
  const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8000/api/user-data/', {
          headers: {
              'Authorization': `Bearer ${authToken}`,
          },
      });

      if (response.ok) {
          const data = await response.json();
          setUserData({ username: data.username, email: data.email });
      } else {
          // Handle errors or set default values
      }
  };

  fetchUserData();
}, []);

const handleUpdateUsername = async (e) => {
  e.preventDefault();
  const authToken = localStorage.getItem('authToken'); // Retrieve the stored token

  try {
      const response = await fetch('http://localhost:8000/api/update-username/', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newUsername }),
      });

      if (response.ok) {
          // Handle successful username update
          console.log('Username updated successfully');
          setUserData(prevDetails => ({ ...prevDetails, username: newUsername }));
      } else {
          // Handle errors (e.g., username already taken)
          console.error('Failed to update username');
      }
  } catch (error) {
      console.error('Error:', error);
  }
};

const handleUpdateEmail = async (e) => {
  e.preventDefault();
  const authToken = localStorage.getItem('authToken'); // Retrieve the stored token

  try {
      const response = await fetch('http://localhost:8000/api/update-email/', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newEmail }),
      });

      if (response.ok) {
          // Handle successful email update
          console.log('Email updated successfully');
          // Update the email in the state or context if needed
      } else {
          // Handle errors (e.g., invalid email format)
          console.error('Failed to update email');
      }
  } catch (error) {
      console.error('Error:', error);
  }
};

const handleDeleteAccount = async (deletePassword) => {
  const authToken = localStorage.getItem('authToken'); // Retrieve the stored token

  const response = await fetch('http://localhost:8000/api/delete-account/', {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${authToken}`, // Include the token in the header
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: deletePassword }),
  });

  if (response.ok) {
      // Handle successful account deletion
      localStorage.removeItem('authToken'); // Clear the token from storage
      setIsLoggedIn(false); // Update the state to reflect that the user is logged out
      navigate('/'); // Redirect to login page
  } else {
      // Handle errors, such as showing a message to the user
  }
};

const handleLogout = async () => {
  const authToken = localStorage.getItem('authToken'); // Retrieve the stored token

  const response = await fetch('http://localhost:8000/api/logout/', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${authToken}`, // Include the token in the header
      },
  });

  if (response.ok) {
      // Handle successful logout
      localStorage.removeItem('authToken'); // Clear the token from storage
      setIsLoggedIn(false); // Update the state to reflect that the user is logged out
      navigate('/'); // Redirect to login page
  } else {
      // Handle errors
  }
};

const onChangePassword = async (currentPassword, newPassword) => {
  try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the stored token
      const response = await fetch('http://localhost:8000/api/change-password/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`, // Include the token in the header
          },
          body: JSON.stringify({ currentPassword, newPassword }),
      });

      return response.ok;
  } catch (error) {
      console.error("Error during password change:", error);
      return false;
  }
};


return (
  <div>
    <h1>Profile-page</h1>
    <div>
    <Link to="/content">Go to Exclusive Content</Link>
    </div>
    <div>
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
    </div>
    <form onSubmit={handleUpdateUsername}>
    <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder="New Username"
    />
    <button type="submit">Update Username</button>
</form>

<form onSubmit={handleUpdateEmail}>
    <input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder="New Email"
    />
    <button type="submit">Update Email</button>
</form>
    <div>
    <form onSubmit={handlePasswordChange}>
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="Current password"
        required
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password"
        required
      />
      <input
        type="password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        placeholder="Confirm new password"
        required
      />
      <button type="submit">Change Password</button>
      {changePasswordMessage && <p>{changePasswordMessage}</p>}
    </form>
    </div>
    <div>
      <input
        type="password"
        value={deletePassword}
        onChange={(e) => setDeletePassword(e.target.value)}
        placeholder="Confirm password to delete"
    />
    <button onClick={confirmAndDeleteAccount}>Delete My Account</button>
    </div>
    <div><button onClick={handleLogout}>Logout</button></div>
  </div>
);
}


export default Profile;