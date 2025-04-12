import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function AuthActionButton({ onClick, label, isLoggedIn, username }) {
  const cn = bem('AuthActionButton');

  return (
    <div className={cn()}>
      {isLoggedIn && (
        <span className={cn('username')} onClick={onClick.profileClick}>
          {username}
        </span>
      )}
      <button className={cn('button')} onClick={isLoggedIn ? onClick.signOut : onClick.signIn}>
        {label}
      </button>
    </div>
  );
}

AuthActionButton.propTypes = {
  onClick: PropTypes.shape({
    signIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    profileClick: PropTypes.func.isRequired
  }).isRequired,
  label: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string
};

export default memo(AuthActionButton);
