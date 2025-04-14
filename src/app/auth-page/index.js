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

  const session = useSelector(state => state.session);
  const profile = useSelector(state => state.profile);

  const navigate = useNavigate();

  const { t } = useTranslate();

  useEffect(() => {
    if (session.token && profile.user) {
      navigate('/profile');
    }
  }, [session.token, profile.user]);

  const handleLogout = async () => {
    await store.actions.session.logout();
    navigate('/');
  };

  const handleSubmit = async (login, password) => {
    const success = await store.actions.session.login(login, password);
    if (success) {
      navigate('/profile');
      return null;
    }

    const error = store.getState().session.error;
    console.log(error);

    return error || 'Ошибка авторизации';
  };

  return (
    <>
      <Head
        title={t('title')}
        authField={<AuthField user={profile.user} token={session.token} callback={handleLogout} />}
      >
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
