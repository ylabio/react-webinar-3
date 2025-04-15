import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function LoginButton({
  isLoggedIn,
  username,
  onLogout,
  loginText,
  logoutText,
}) {
  return (
    <div className="LoginHeader">
      {isLoggedIn && username && (
        <Link to="/profile" className="login-username">
          {username}
        </Link>
      )}
      {isLoggedIn ? (
        <button className="login-btn" onClick={onLogout}>
          {logoutText}
        </button>
      ) : (
        <Link to="/login" className="login-btn">
          {loginText}
        </Link>
      )}
    </div>
  );
}

LoginButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
  loginText: PropTypes.string.isRequired,
  logoutText: PropTypes.string.isRequired,
};

export default LoginButton;
