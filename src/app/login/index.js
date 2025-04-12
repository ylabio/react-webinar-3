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

  // Если пользователь уже авторизован — отправляем в профиль
  useEffect(() => {
    if (user.token && user.data) {
      navigate('/profile');
    }
  }, [user.token, user.data, navigate]);

  // Обработка формы логина
  const handleSubmit = async e => {
    e.preventDefault();

    // Удаляем пробелы по краям
    const trimmedLogin = login.trim();
    const trimmedPassword = password.trim();

    if (!trimmedLogin || !trimmedPassword) {
      setError(t('login.error.empty')); // Пример: "Введите логин и пароль"
      return;
    }

    setError('');

    // Отправляем очищенные данные
    const success = await store.actions.user.login(trimmedLogin, trimmedPassword);

    if (success) {
      navigate('/profile');
    } else {
      const errPayload = store.getState().user.error;
      const issue = errPayload?.data?.issues?.[0]?.message;
      const fallback = errPayload?.message;

      setError(issue || fallback || t('login.error.fail'));
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
