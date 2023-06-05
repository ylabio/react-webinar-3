import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginTool from '../../components/login/login-tool';
import Spinner from '../../components/spinner';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

/**
 * Умная верхняя панелька статуса юзера. Применяется на всех страницах
 */

function LoginBar() {

  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslate();
  const store = useStore();

  const { user, waiting } = useSelector(state => ({
    user: state.session.user, // если есть, то есть и сессия и поля в user
    waiting: state.session.waiting,
  }));

  const callbacks = {
    // Открыть страницу входа
    onLogin: useCallback(() => { navigate('/login', { state: { from: location } }) }, []),

    // Разлогиниться
    onLogout: useCallback(() => store.actions.session.logout(), [store])
  }

  return (
    <Spinner active={waiting}>
      <LoginTool
        action={user ? callbacks.onLogout : callbacks.onLogin}
        name={user?.profile?.name ? user.profile.name : user?.username}
        link={'/profile'}
        t={t}
      />
    </Spinner>
  );
};

export default React.memo(LoginBar);