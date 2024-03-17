import {memo, useCallback} from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import PageLayout from '../../components/page-layout';
import AuthLogin from '../../containers/auth-login';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';

/**
 * Cтраница авторизации пользователя
 */

function Login () {

  const {t} = useTranslate();

  const select = useSelector(state => ({
    error: state.login.error,
  }));

  const store = useStore();

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
      <LoginForm 
        link={'/profile'}
        signIn={t('authlogin.signIn')} 
        textLogin={t('login.text')}
        password={t('login.password')}
        logIn={t('login.logIn')}
        error={select.error}
        loginUser={callbacks.loginUser}
      />
    </PageLayout>
  );
}

export default memo(Login);