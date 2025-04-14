import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import AuthBar from '../../components/auth-bar';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import LoginForm from '../../containers/login-form';

/**
 * Страница авторизации пользователя
 */
function Login() {
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector(state => ({
    user: state.session.user,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Редирект на страницу login
    redirectToLogin: useCallback(() => navigate('/login'), [navigate]),
    // Выход пользователя
    onLogOut: useCallback(() => {
      store.actions.session.logOut();
      navigate('/');
    }, [store, navigate]),
  };

  return (
    <>
      <AuthBar
        buttonTitle={select.user ? t('logOut') : t('logIn')}
        userTitle={select.user?.username}
        onClickButton={select.user ? callbacks.onLogOut : callbacks.redirectToLogin}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm />
      </PageLayout>
    </>
  );
}

export default memo(Login);
