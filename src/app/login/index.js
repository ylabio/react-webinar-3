import { memo, useCallback, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../components/login-form';
import Header from '../../containers/header';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Страница для авторизации пользователя
 */
function Login() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
  }));

  useEffect(() => {
    if (select.isLoggedIn) {
      const newPath = location.state?.from?.pathname || '/';
      console.log(newPath);
      navigate(newPath);
    }
  }, [select.isLoggedIn])

  
  const callbacks = {
    //Вход пользователя
    logInUser: useCallback((user) => store.actions.auth.logInUser(user), [store]),
  };

  return (
    <>
      <Header />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm  onSubmit={callbacks.logInUser} error={select.error} t={t}/>
      </PageLayout>
    </>
  );
}

export default memo(Login);
