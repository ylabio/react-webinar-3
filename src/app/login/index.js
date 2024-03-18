import { memo, useCallback } from 'react';
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

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    isAuth: state.user.isAuth,
    errorMessage: state.user.errorMessage
  }));
  const callbacks = {
    login: useCallback(({ username, password }) => {
      store.actions.user.login(username, password)
        .then(() => {
          navigate('/profile');
        })
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
        <AuthForm onSubmit={callbacks.login} errorMessage={select.errorMessage}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
