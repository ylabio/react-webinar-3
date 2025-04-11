import { memo } from 'react';
import { Navigate } from 'react-router-dom';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import LoginFormContainer from '../../containers/login-form';
import AuthHeaderContainer from '../../containers/auth-header';

function LoginPage() {
  const { t } = useTranslate();
  const token = localStorage.getItem('authToken');

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <AuthHeaderContainer />
      <Head title={t('login.title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginFormContainer />
      </PageLayout>
    </>
  );
}

export default memo(LoginPage);
