import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import AuthContainer from '../../containers/auth';
import Navigation from '../../containers/navigation';
import Form from '../../components/login-form';

/**
 * Страница авторизации пользователя
 */
function Login() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { issues = null } = useSelector(state => state.login || {});

  const handleLogin = useCallback(async (credentials) => {
    try {
      const success = await store.actions.login.login(credentials);
      if (success) {
        navigate('/');
      }
    } catch (e) {
      console.error('Ошибка:', e);
    }
  }, [store, navigate]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    handleLogin({ 
      login: login.trim(),
      password: password.trim()
    });
  }, [login, password, handleLogin]);

  return (
    <>
      <AuthContainer />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Form
          onSubmit={handleSubmit}
          title={t('login.title')}
          loginBtn={t('login.btn')}
          loginLabel={t('login.label')}
          pswLabel={t('psw.label')}
          issues={issues}
          loginValue={login}
          passwordValue={password}
          onLoginChange={setLogin}
          onPasswordChange={setPassword}
          placeholderLog={t('placeholder.log')}
          placeholderPsw={t('placeholder.psw')}
        />
      </PageLayout>
    </>
  );
}

export default memo(Login);