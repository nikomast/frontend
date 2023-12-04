import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, currentPage }) {
  return (
    <div className="top-header">
      <div className="logo">
          <Link to="">Your Logo</Link>
      </div>
      <nav className="navigation">
          <Link to="">About</Link>
          <Link to="">Services</Link>
          <Link to="">Contact</Link>
      </nav>
      <div className="auth-links">
        {!isLoggedIn && (
            <>
                <Link to="/login">Login</Link>
                <Link to="/sign-up">Sign Up</Link>
            </>
        )}
        {isLoggedIn && currentPage !== 'profile' &&(
            <Link to="/profile">Profile</Link>
        )}
        {currentPage === 'profile' && isLoggedIn && (
             <Link to="/content">Content</Link>
        )}
      </div>
    </div>
  );
}

export default Header;
