import { memo } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import HeadTop from '../../components/head-top';
import AuthForm from '../../components/auth-form';
import useTranslate from '../../hooks/use-translate';
import useAuth from '../../hooks/use-auth';

function Login() {
  const { t } = useTranslate();
  const { error, signIn, token, user, signOut } = useAuth();

  const handleSubmit = (login, password) => {
    signIn(login, password);
  };

  return (
    <>
      <HeadTop username={user?.username} token={token} signOut={signOut} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <AuthForm error={error} handleSubmit={handleSubmit} />
      </PageLayout>
    </>
  );
}

export default memo(Login);
