import { useCallback, useState } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import LoginForm from '../../components/login-form';
import Navigation from '../../containers/navigation';
import useStore from '../../hooks/use-store';
import UserBlock from '../../containers/user-block';
import {useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';


function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ login: '', password: '' });
  const [error, setError] = useState({ message: '', isError: false });
  const { t } = useTranslate();
  const callbacks = {
    login: useCallback(({ login, password }) => store.actions.user.login({ login, password }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await callbacks.login(userData);
      setError({ message: '', isError: false });
      navigate('/profile');
    } catch (err) {
      setError({ message: err.message, isError: true });
    }
  }

  return (
    <PageLayout>
      <UserBlock />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm userData={userData} setUserData={setUserData} onSubmit={onSubmit} error={error} t={t} />
    </PageLayout>
  );
}

export default Login