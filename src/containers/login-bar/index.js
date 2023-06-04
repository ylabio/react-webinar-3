import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginTool from '../../components/login/login-tool';
import Spinner from '../../components/spinner';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useUser from '../../hooks/use-user';

/**
 * Умная верхняя панелька статуса юзера. Применяется на всех страницах
 */

function LoginBar() {

  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();
  const { fields, token, waiting } = useUser({ orRedirectTo: null });

  const callbacks = {
    // Открыть страницу входа
    onLogin: useCallback(() => { navigate('/login', { state: { from: location } }) }, []),

    // Разлогиниться
    onLogout: useCallback(() => store.actions.user.logout(), [store])
  }

  return (
    <Spinner active={waiting}>
      <LoginTool
        action={token ? callbacks.onLogout : callbacks.onLogin}
        name={fields?.profile?.name ? fields.profile.name : fields?.username}
        link={'/profile'}
        t={t}
      />
    </Spinner>
  );
};

export default React.memo(LoginBar);