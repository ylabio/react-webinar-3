import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function UserActions({ 
  name, 
  isAuth = false,
  title, 
  onClick = () => {}, 
  }) {
  const cn = bem('UserActions');
  return (
    <div className={cn()}>
      {isAuth && <Link  to={'/profile'}>{name}</Link>}
      <button className={cn('button')} onClick={onClick}>
        {title}
      </button>
    </div>
  );
}

UserActions.propTypes = {
  name: PropTypes.string,
  isAuth: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string
};

export default memo(UserActions);
