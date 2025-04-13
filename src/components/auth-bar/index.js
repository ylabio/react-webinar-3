import { memo, useCallback } from 'react';
import { cn as classname } from '@bem-react/classname';
import { Link, useLocation } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

import './style.css';

const cn = classname('AuthBar');

function AuthBar() {
  const store = useStore();
  const location = useLocation();

  const select = useSelector(state => ({
    user: state.user.user,
    token: state.user.token,
  }));

  const callbacks = {
    logout: useCallback(() => {
      return store.actions.user.logoutUser();
    }, [store]),
  };

  return (
    <div className={cn()}>
      <div className={cn('account')}>
        <div className={cn('account-container')}>
          {select.user?.profile?.name && (
            <Link to="/profile" className={cn('account-name')}>
              {select.user.profile.name}
            </Link>
          )}
          {select.token ? (
            <Link onClick={callbacks.logout} className={cn('account-container-link')}>
              Выход
            </Link>
          ) : (
            <Link to="/login" className={cn('account-container-link')} state={{ from: location.pathname }}>
              Вход
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(AuthBar);
