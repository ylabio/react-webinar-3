import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

function UserMenu({ onNavigate, isAuth, username, onLogout, t }) {
  const onClick = () => (isAuth ? onLogout() : onNavigate());
  const cn = bem('User-menu');

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        {isAuth && (
          <Link className={cn('link')} to="/profile">
            {username}
          </Link>
        )}
        {isAuth ? (
          <Button style="text" onClick={onClick} title={t('user.logout')} />
        ) : (
          <Button style="text" onClick={onClick} title={t('user.login')} />
        )}
        {/* <button className={cn('button')} onClick={onClick}>
          {isAuth ? t('user.logout') : t('user.login')}
        </button> */}
      </div>
    </div>
  );
}

UserMenu.propTypes = {
  onNavigate: PropTypes.func,
  onLogout: PropTypes.func,
  isAuth: PropTypes.bool,
  username: PropTypes.string,
};

UserMenu.defaultProps = {
  onNavigate: () => {},
  onLogout: () => {},
};

export default memo(UserMenu);
