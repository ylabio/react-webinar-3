import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function ProfileHeader({ isAuth, userName = '', onClick = () => {}, links }) {
  const cn = bem('ProfileHeader');

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        {!isAuth && (
          <Link to={links.in} className={cn('link')}>
            Вход
          </Link>
        )}
        {isAuth && (
          <>
            {
              <Link to={links.me} className={cn('link')}>
                {userName}
              </Link>
            }
            <Link to={links.out} className={cn('link')} onClick={onClick}>
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
  links: PropTypes.shape({
    in: PropTypes.string,
    me: PropTypes.string,
    out: PropTypes.string,
  }).isRequired,
};

export default memo(ProfileHeader);
