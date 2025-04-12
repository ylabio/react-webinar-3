import { memo, useCallback, useEffect } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import LoginForm from '../../components/login-form';
import UserNavigation from '../../containers/user-navigation';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../../utils';

/**
 * Страница авторизации
 */
function Login() {
  const store = useStore();
  let navigate = useNavigate();

  const select = useSelector(state => ({
    error: state.user.error,
    user: state.user.profile?.username,
  }));

  useEffect(() => {
    if (select.user && isAuth()) {
      navigate('/');
    }
  }, [select.user, isAuth(), navigate]);

  const { t } = useTranslate();

  const callbacks = {
    handleLogin: useCallback(
      (login, password) => store.actions.user.login(login, password),
      [store],
    ),
  };

  return (
    <>
      <UserNavigation />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm onSubmit={callbacks.handleLogin} error={select.error} t={t} />
      </PageLayout>
    </>
  );
}

export default memo(Login);
