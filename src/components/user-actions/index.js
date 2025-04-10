import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function UserActions({ 
  username, 
  isAuth = false, 
  onClick = () => {}, 
  }) {
  const cn = bem('UserActions');
  return (
    <div className={cn()}>
      {isAuth && <Link  to={'/profile'}>{username}</Link>}
      <button className={cn('button')} onClick={onClick}>
        {isAuth ? 'Выход' : 'Войти'}
      </button>
    </div>
  );
}

UserActions.propTypes = {
  username: PropTypes.string,
  isAuth: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(UserActions);
