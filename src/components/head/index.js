import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function Head({ title, children, username, isAuth, onLogout, t }) {
  return (
    <div className="Head">
      <div className="Head-auth">
        <div className="Head-auth-container">
          {isAuth ? (
            <>
              <Link to="/profile" className="Head-username">
                {username}
              </Link>
              <button onClick={onLogout} className="Head-login">
                {t('login.logout')}
              </button>
            </>
          ) : (
            <Link to="/login" className="Head-login">
              {t('login.login')}
            </Link>
          )}
        </div>
      </div>
      <div className="Head-container">
        <h1>{title || t('title')}</h1>
        <div className="Head-place">{children}</div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  username: PropTypes.string,
  isAuth: PropTypes.bool,
  onLogout: PropTypes.func,
  t: PropTypes.func,
};

export default memo(Head);
