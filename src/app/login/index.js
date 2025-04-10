import { memo, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import AuthSlot from '../../components/auth-slot';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const store = useStore();
  const user = useSelector(state => state.user);
  const { t } = useTranslate();

  useEffect(() => {
    if (user.token && user.data) {
      navigate('/profile');
    }
  }, [user.token, user.data]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!login || !password) {
      setError(t('login.error.empty')); // Пример: "Введите логин и пароль"
      return;
    }

    setError('');

    const success = await store.actions.user.login(login, password);

    if (success) {
      navigate('/profile');
    } else {
      const err = store.getState().user.error;
      setError(err || t('login.error.fail')); // Пример: "Ошибка авторизации"
    }
  };

  const handleChangeLogin = useCallback(val => setLogin(val), []);
  const handleChangePassword = useCallback(val => setPassword(val), []);

  return (
    <>
      <Head title={t('title')} authSlot={<AuthSlot />}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm
          login={login}
          password={password}
          error={error}
          onChangeLogin={handleChangeLogin}
          onChangePassword={handleChangePassword}
          onSubmit={handleSubmit}
        />
      </PageLayout>
    </>
  );
}

export default memo(LoginPage);
