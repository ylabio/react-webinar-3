import { memo, useCallback, useState } from 'react';
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
// import useInit from '../../hooks/use-init';
import LoginEntry from '../../containers/login-entry';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';

/**
 * Страница с аутентификацией
 */
function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const select = useSelector(state => ({
    error: state.user.error,
    autenticated: state.user.autenticated,
  }));

  if (select.autenticated) {
    navigate('/');
  }

  const callbacks = {
    // Аутентификация
    signIn: useCallback((username, password) => {
      store.actions.user.signIn(username, password, navigate);
    }, [store])
  };

  const { t } = useTranslate();

  return (
    <>
      <LoginEntry />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm 
          username={username} 
          password={password}
          error={select.error} 
          setUsername={setUsername}
          setPassword={setPassword} 
          signIn={callbacks.signIn}  
        />
      </PageLayout>
    </>
  );
}

export default memo(Login);
