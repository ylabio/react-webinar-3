import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function ProfileHeader({ isAuth, userName = '', onClick = () => {}, location }) {
  const cn = bem('ProfileHeader');

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        {!isAuth && (
          <Link to="/login" state={{ from: location }} className={cn('link')}>
            Вход
          </Link>
        )}
        {isAuth && (
          <>
            {
              <Link to="/profile" className={`${cn('link')} ${cn('link_user')}`}>
                {userName}
              </Link>
            }

            <Link to="/" className={cn('link')} onClick={onClick}>
              Выход
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  isAuth: PropTypes.bool,
  userName: PropTypes.string,
  onClick: PropTypes.func,
};

export default memo(ProfileHeader);
