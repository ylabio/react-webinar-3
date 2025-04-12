import { memo, useEffect } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useLocation } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';
import { isAuth } from '../../utils';

function UserNavigation() {
  const cn = bem('UserNavigation');
  const store = useStore();
  const { t } = useTranslate();
  const location = useLocation();

  const userName = useSelector(state => state.user.profile?.username);
  const isAuthenticated = isAuth();

  useEffect(() => {
    if (isAuthenticated && !userName) {
      store.actions.user.loadProfile();
    }
  }, [isAuthenticated, userName]);

  const callbacks = {
    onLogout: () => {
      store.actions.user.logout();
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        {userName ? (
          <>
            <Link to="/profile" className={cn('username')}>
              {userName}
            </Link>
            <button onClick={callbacks.onLogout} className={cn('logout')}>
              {t('user.logout')}
            </button>
          </>
        ) : (
          <Link
            className={cn('login')}
            to="/login"
            state={{ from: location.pathname }}
            onClick={callbacks.onRemoveError}
          >
            {t('user.login')}
          </Link>
        )}
      </div>
    </div>
  );
}

export default memo(UserNavigation);
