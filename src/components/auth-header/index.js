import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function AuthHeader({
  isAuth = false,
  loading = false,
  userName = '',
  onLogout,
  onInit,
  initialized,
}) {
  const cn = bem('AuthHeader');

  // Инициализация при монтировании
  useEffect(() => {
    if (!initialized) {
      onInit();
    }
  }, [onInit, initialized]);

  if (loading) {
    return (
      <div className={cn()}>
        <div className={cn('container')}>
          <span>Загрузка...</span>
        </div>
      </div>
    );
  }

  if (isAuth) {
    return (
      <div className={cn()}>
        <div className={cn('container')}>
          <Link to="/profile">
            <span>{userName}</span>
          </Link>
          <button onClick={onLogout} className={cn('link')}>
            Выход
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <Link to="/login" className={cn('link')}>
          Вход
        </Link>
      </div>
    </div>
  );
}

AuthHeader.propTypes = {
  isAuth: PropTypes.bool,
  loading: PropTypes.bool,
  userName: PropTypes.string,
  onLogout: PropTypes.func,
  onInit: PropTypes.func,
};

export default memo(AuthHeader);
