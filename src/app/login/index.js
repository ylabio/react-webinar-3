import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';

function Login() {
  const { t } = useTranslate();

  return (
    <>
      <Head title={t('login.title')} />
      <PageLayout>
        <Navigation />
        <LoginForm t={t} />
      </PageLayout>
    </>
  );
}

export default memo(Login);