import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import { useSession } from '../../hooks/use-session';
import { useUser } from '../../hooks/use-user';
import LoginButton from '../../components/login-header';

function LoginHeaderContainer() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { token, logout } = useSession();
  const { user } = useUser();

  const isLoggedIn = Boolean(token);
  const username = user?.username || '';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <LoginButton
      isLoggedIn={isLoggedIn}
      username={username}
      onLogout={handleLogout}
      loginText={t('login.btn')}
      logoutText={t('logout.btn')}
    />
  );
}

export default LoginHeaderContainer;