import { memo, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useAuthSlotProps from '../../hooks/use-auth-slot';

import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import AuthSlot from '../../components/auth-slot';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const store = useStore();
  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.profile);
  const waiting = useSelector(state => state.user.waiting);
  const { t } = useTranslate();

  const { isLoading, isAuthorized, isUnauthorized, username, handleLogout } = useAuthSlotProps();

  useEffect(() => {
    if (user.token && profile.data) {
      navigate('/profile', { replace: true });
    }
  }, [user.token, profile.data, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();

    const trimmedLogin = login.trim();
    const trimmedPassword = password.trim();

    if (!trimmedLogin || !trimmedPassword) {
      setError(t('login.error.empty'));
      return;
    }

    setError('');

    const success = await store.actions.user.login(trimmedLogin, trimmedPassword);

    if (success) {
      navigate('/profile');
    } else {
      const errPayload = store.getState().user.error;
      const issue = errPayload?.data?.issues?.[0]?.message;
      const fallback = errPayload?.message;

      setError(issue || fallback || t('login.error.fail'));
    }
  };

  const handleChangeLogin = useCallback(val => setLogin(val), []);
  const handleChangePassword = useCallback(val => setPassword(val), []);

  const auth = (
    <AuthSlot
      isLoading={isLoading}
      isAuthorized={isAuthorized}
      isUnauthorized={isUnauthorized}
      username={username}
      onLogout={handleLogout}
    />
  );

  return (
    <>
      <Head title={t('title')} authSlot={auth}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm
          login={login}
          password={password}
          error={error}
          onChangeLogin={handleChangeLogin}
          onChangePassword={handleChangePassword}
          onSubmit={handleSubmit}
          waiting={waiting}
        />
      </PageLayout>
    </>
  );
}

export default memo(LoginPage);
