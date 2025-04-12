import { memo, useCallback, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../components/login-form';
import Header from '../../containers/header';
import { useNavigate } from 'react-router-dom';

/**
 * Страница для авторизации пользователя
 */
function Login() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isLoggedIn: state.user.isLoggedIn,
    error: state.user.error,
  }));

  useEffect(() => {
    if (select.isLoggedIn) {
      navigate('/');
    }
  }, [select.isLoggedIn])

  
  const callbacks = {
    //Вход пользователя
    logInUser: useCallback((user) => store.actions.user.logInUser(user), [store]),
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
