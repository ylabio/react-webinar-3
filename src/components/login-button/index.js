import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function LoginButton({
  isAuth,
  userName,
  isLoading,
  loginPath,
  onLogout,
  t
}) {
  return (
    <div className="LoginButton">
      <div className="LoginButton-container">
        {isAuth ? (
          <>
            <Link to="/profile">{userName}</Link>
            <button
              onClick={onLogout}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? t('loading') : t('head.exit')}
            </button>
          </>
        ) : (
          <Link to={loginPath}>
            {t('head.entry')}
          </Link>
        )}
      </div>
    </div>
  );
}

LoginButton.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  isLoading: PropTypes.bool,
  loginPath: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

LoginButton.defaultProps = {
  userName: '',
  isLoading: false,
};

export default memo(LoginButton);
