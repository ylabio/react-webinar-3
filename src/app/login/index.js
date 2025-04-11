import { memo, useCallback, useEffect, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import PageLayout from '../../components/page-layout';
import UserMenu from '../../components/user-menu';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/login-form';

function Login() {
  const store = useStore();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const select = useSelector(state => ({
    username: state.login.username,
    isAuth: state.login.isAuth,
    error: state.login.error,
  }));

  const { t } = useTranslate();

  const callbacks = {
    onNavigate: useCallback(() => navigate('/login'), [store]),
    onLogin: useCallback((login, password) => store.actions.login.login(login, password), [store]),
    onLogout: useCallback(() => store.actions.login.logout(), [store]),
    resetError: useCallback(() => store.actions.login.resetError(), [store]),
  };

  useEffect(() => {
    callbacks.resetError();
    if (select.isAuth && token && location.pathname === '/login') navigate(-1);
  }, [select.isAuth]);

  return (
    <>
      <UserMenu
        onLogout={callbacks.onLogout}
        onNavigate={callbacks.onNavigate}
        username={select.username}
        isAuth={select.isAuth}
        t={t}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm title={t('user.login')} onLogin={callbacks.onLogin} error={select.error} t={t} />
      </PageLayout>
    </>
  );
}

export default memo(Login);
