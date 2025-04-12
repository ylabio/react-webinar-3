import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import AuthField from '../../components/auth-field';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import AuthCard from '../../components/auth-card';

function AuthPage() {
  const store = useStore();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const { t } = useTranslate();

  useEffect(() => {
    if (user.token && user.data) {
      navigate('/profile');
    }
  }, [user.token, user.data]);

  const handleLogout = async () => {
    await store.actions.user.logout();
    navigate('/');
  };

  const handleSubmit = async (login, password) => {
    const success = await store.actions.user.auth(login, password);
    if (success) {
      navigate('/');
      return null;
    } else {
      const err = store.getState().user.error;
      return err || 'Ошибка авторизации';
    }
  };

  return (
    <>
      <Head title={t('title')} authField={<AuthField user={user} callback={handleLogout} />}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <AuthCard onSubmit={handleSubmit} />
      </PageLayout>
    </>
  );
}

export default AuthPage;
