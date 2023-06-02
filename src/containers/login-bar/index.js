import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginTool from '../../components/login/login-tool';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useUser from '../../hooks/use-user';

/**
 * Умная верхняя панелька статуса юзера/логина. Применяется на всех страницах
 */

function LoginBar() {

  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();
  const { fields, token, error, waiting } = useUser({ orRedirectTo: null });

  useInit(() => {
    if (token && !fields)
      store.actions.user.load();
  }, [fields, token]);

  useEffect(() => {
    if (waiting)
      return;
    if (token && error) { // если загрузка с имеющимся токеном провалилась, то идем логиниться
      store.actions.user.resetError();
      navigate('/login', { state: { from: location }});
    }
  }, [waiting, error]);

  const callbacks = {
    // Открыть страницу входа
    onLogin: useCallback(() => { navigate('/login', { state: { from: location } }) }, []),

    // Разлогиниться
    onLogout: useCallback(() => store.actions.user.logout(), [store])
  }

  return (
    <LoginTool
      action={token ? callbacks.onLogout : callbacks.onLogin}
      name={fields?.profile?.name ? fields.profile.name : fields?.username}
      link={'/profile'}
      t={t}
    />
  );
};

export default React.memo(LoginBar);