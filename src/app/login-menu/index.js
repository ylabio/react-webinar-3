import {memo, useCallback, useEffect, useMemo} from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginMenu() {
  const store = useStore();
  const cn = bem('LoginMenu');
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    auth: state.authorization,
  }));

  const callbacks = {
    handleLogout: useCallback(() => store.actions.authorization.logoutUser(), []),
    handleLogin: useCallback(() => navigate('/login', {state: {back: location.pathname}}), []),
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        {select.auth.isLogin ? (
          <>
            <Link className={cn('profile')} to="/profile">
              {select.auth.userData.profile.name}
            </Link>
            <Link className={cn('link')} to="/" onClick={callbacks.handleLogout}>
              Выход
            </Link>
          </>
        ) : (
          <button className={cn('link')} onClick={callbacks.handleLogin}>
            Вход
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(LoginMenu);
