import {memo, useCallback} from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import AuthLogin from '../../containers/auth-login';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';
import Spinner from '../../components/spinner';

/**
 * Cтраница авторизации пользователя
 */

function Login () {

  const store = useStore();

  useInit(() => {
    store.actions.login.deleteError();
  }, [], true);

  const {t} = useTranslate();

  const select = useSelector(state => ({
    waiting: state.login.waiting,
    error: state.login.error,
  }));

  const callbacks = {
    loginUser: useCallback((authUser) => store.actions.login.loginUser(authUser), [store])
  };

  return (
    <PageLayout>
      <AuthLogin/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <LoginForm 
          linkBack={-1}
          linkMain={'/'}
          signIn={t('authlogin.signIn')} 
          textLogin={t('login.text')}
          password={t('login.password')}
          logIn={t('login.logIn')}
          error={select.error}
          loginUser={callbacks.loginUser}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);