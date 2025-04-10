import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function UserActions({ 
  user, 
  isAuth = false, 
  onClick = () => {}, 
  }) {
  const cn = bem('UserActions');
  return (
    <div className={cn()}>
      {isAuth && <Link  to={'/profile'}>{user.name}</Link>}
      <button className={cn('button')} onClick={onClick}>
        {isAuth ? 'Выход' : 'Войти'}
      </button>
    </div>
  );
}

UserActions.propTypes = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  isAuth: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(UserActions);
