import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import PageLayout from '../../components/page-layout';
import AuthForm from '../../components/auth-form';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import Navigation from '../../containers/navigation';
import HeaderAuth from '../../containers/header-auth';
import Head from '../../components/head';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';


function Login() {
  const {t} = useTranslate();
  const store = useStore();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    isAuth: state.user.isAuth,
  }));

  const callbacks = {
    login: useCallback(async ({ username, password }) => {
      try {
        await store.actions.user.login(username, password);
        navigate('/profile');
      } catch (error) {
        setErrorMessage(error.message); 
      }
    }, [store.user]),
  };
  return (
    <PageLayout>
      <HeaderAuth />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <AuthForm onSubmit={callbacks.login} errorMessage={errorMessage}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
