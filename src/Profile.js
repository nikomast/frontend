import './App.css';
import Header from './header';
import Footer from './footer';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Profile({setIsLoggedIn, isLoggedIn}) {

  const navigate = useNavigate();
  const [deletePassword, setDeletePassword] = useState('');

  const confirmAndDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        handleDeleteAccount(deletePassword);
    }
};

const [errorMessage, setErrorMessage] = useState('');
const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');
const [changePasswordMessage, setChangePasswordMessage] = useState('');
const [userData, setUserData] = useState({ username: '', email: '' , is_paid_user: false});
const [newUsername, setNewUsername] = useState('');
const [newEmail, setNewEmail] = useState('');
const [isPaidUser, setIsPaidUser] = useState(false);

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
    setChangePasswordMessage('Failed to change password (demo account cant be modified).');
  }
};


useEffect(() => {
  const fetchUserData = async () => {
      const authToken = sessionStorage.getItem('authToken');
      const response = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/user-data/', {
          headers: {
              'Authorization': `Bearer ${authToken}`,
          },
      });

      if (response.ok) {
          const data = await response.json();
          setUserData({ username: data.username, email: data.email, is_paid_user: data.is_paid_user});
      } else {
        setErrorMessage('New login is needed.');
      }
  };

  fetchUserData();
}, []);

const handleUpdateUsername = async (e) => {
  e.preventDefault();
  const authToken = sessionStorage.getItem('authToken'); // Retrieve the stored token

  try {
      const response = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/update-username/', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newUsername }),
      });

      if (response.ok) {
          // Handle successful username update
          setUserData(prevDetails => ({ ...prevDetails, username: newUsername }));
      } else {
        setErrorMessage('Username update failed (demo account cant be modified).');
      }
  } catch (error) {
      //console.error('Error:', error);
  }
};

const handleUpdateEmail = async (e) => {
  e.preventDefault();
  const authToken = sessionStorage.getItem('authToken'); // Retrieve the stored token

  try {
      const response = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/update-email/', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newEmail }),
      });

      if (response.ok) {
          // Handle successful email update
          setUserData(prevDetails => ({ ...prevDetails, email: newEmail })); // Update the email in the state
      } else {
        setErrorMessage('Email could not be updated (demo account cant be modified).');
      }
  } catch (error) {
    ;
  }
};

const handleDeleteAccount = async (deletePassword) => {
  const authToken = sessionStorage.getItem('authToken'); // Retrieve the stored token

  const response = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/delete-account/', {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${authToken}`, // Include the token in the header
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: deletePassword }),
  });

  if (response.ok) {
      // Handle successful account deletion
      sessionStorage.removeItem('authToken'); // Clear the token from storage
      setIsLoggedIn(false); // Update the state to reflect that the user is logged out
      navigate('/'); // Redirect to login page
  } else {
    setErrorMessage('Account deletion failed (demo account cant be modified).');
  }
};

const handleLogout = async () => {
  const authToken = sessionStorage.getItem('authToken'); // Retrieve the stored token

  const response = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/logout/', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${authToken}`, // Include the token in the header
      },
  });

  if (response.ok) {
      // Handle successful logout
      sessionStorage.removeItem('authToken'); // Clear the token from storage
      setIsLoggedIn(false); // Update the state to reflect that the user is logged out
      navigate('/'); // Redirect to login page
  } else {
    setErrorMessage('Something went wrong. Refresh the page.');
  }
};

const onChangePassword = async (currentPassword, newPassword) => {
  try {
      const authToken = sessionStorage.getItem('authToken'); // Retrieve the stored token
      const response = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/change-password/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`, // Include the token in the header
          },
          body: JSON.stringify({ currentPassword, newPassword }),
      });

      return response.ok;
  } catch (error) {
    setErrorMessage('Password change failed (demo account cant be modified).');
      return false;
  }
};

const togglePaidStatus = async () => {
  try {
    const authToken = sessionStorage.getItem('authToken');
    const response = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/toggle-paid-status/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      // Fetch and update the user data to reflect the new paid status
      const userDataResponse = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/user-data/', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (userDataResponse.ok) {
        const userData = await userDataResponse.json();
        setUserData(userData);
        setIsPaidUser(userData.is_paid_user);
      } else {
        // Handle errors or set default values
        setErrorMessage('Something went wrong. Refresh the page.');
      }
    } else {
      // Handle error (e.g., display an error message)
      setErrorMessage('Something went wrong. Refresh the page.');
    }
  } catch (error) {
    setErrorMessage('Something went wrong. Refresh the page.');
  }
};



return (
  <div className='App'>
  <Header isLoggedIn={isLoggedIn} currentPage="profile" />
  <div className='App-header'>
    <div className="user-info-container">
      <h1>Profile information</h1>
      <p>Username: {userData.username}</p> <p>Email: {userData.email}</p>
      <p>Account Type: {userData.is_paid_user ? 'Paid' : 'Free'}</p>
      <button onClick={togglePaidStatus}>Account status</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
    <h1>edit profile</h1>
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    <form onSubmit={handleUpdateUsername} className="profile-form">
      <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder="New Username"
      />
      <button type="submit">Update Username</button>
    </form>
    <form onSubmit={handleUpdateEmail} className="profile-form">
      <input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder="New Email"
      />
      <button type="submit">Update Email</button>
    </form>
    <form onSubmit={handlePasswordChange} className="profile-form">
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
    <div className="profile-form">
      <input
        type="password"
        value={deletePassword}
        onChange={(e) => setDeletePassword(e.target.value)}
        placeholder="Confirm password to delete"
      />
      <button onClick={confirmAndDeleteAccount}>Delete My Account</button>
    </div>
  </div>
  <Footer/>
  </div>
);

}


export default Profile;