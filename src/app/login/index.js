import { memo, useEffect } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import LoginFormContainer from '../../containers/login-form';
import AuthHeaderContainer from '../../containers/auth-header';
import useAuth from '../../hooks/use-auth';

function LoginPage() {
  const { t } = useTranslate();
  useAuth(true);

  useEffect(() => {
    document.title = t('title');
  }, []);

  return (
    <>
      <AuthHeaderContainer />
      <Head title={t('title')}>
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
