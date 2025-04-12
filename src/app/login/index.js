import { memo } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';

/**
 * Страница с формой авторизации
 */
function Login() {
  const store = useStore();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await store.actions.user.login({ login, password });
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };
  const { t } = useTranslate();

  return (
    <>
      <Head title={t('title')}>
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm
          login={login}
          password={password}
          error={error}
          onChangeLogin={setLogin}
          onChangePassword={setPassword}
          onSubmit={handleSubmit}
        />
      </PageLayout>
    </>
  );
}

export default memo(Login);
