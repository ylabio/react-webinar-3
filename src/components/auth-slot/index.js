import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function AuthSlot({ isLoading, isAuthorized, isUnauthorized, username, onLogout }) {
  return (
    <div className="Container">
      <div className="AuthSlot">
        {isLoading && (
          <div className="AuthSlot-skeleton">
            <div className="skeleton-name" />
            <div className="skeleton-button" />
          </div>
        )}

        {isAuthorized && (
          <>
            <div className="Sign-in">
              <Link to="/profile">{username}</Link>
            </div>
            <button onClick={onLogout}>Выход</button>
          </>
        )}

        {isUnauthorized && (
          <div className="Sign-in">
            <Link to="/login">Вход</Link>
          </div>
        )}
      </div>
    </div>
  );
}

AuthSlot.propTypes = {
  isLoading: PropTypes.bool,
  isAuthorized: PropTypes.bool,
  isUnauthorized: PropTypes.bool,
  username: PropTypes.string,
  onLogout: PropTypes.func,
};

export default memo(AuthSlot);
