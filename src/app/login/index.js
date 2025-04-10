import { memo, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import { useNavigate } from 'react-router-dom';
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
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!login || !password) {
      setError('Введите логин и пароль');
      return;
    }

    setError('');

    const success = await store.actions.user.login(login, password);

    if (success) {
      navigate('/profile');
    } else {
      const err = store.getState().user.error;
      setError(err || 'Ошибка авторизации');
    }
  };

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
          onChangeLogin={val => setLogin(val)}
          onChangePassword={val => setPassword(val)}
          onSubmit={handleSubmit}
        />
      </PageLayout>
    </>
  );
}

export default memo(LoginPage);
