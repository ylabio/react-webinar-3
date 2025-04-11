import { memo, } from 'react';
import useTranslate from '../../hooks/use-translate';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';

import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../components/login-form';
import AuthBar from '../../components/auth-bar';

/**
 * Страница авторизации
 */
function Login() {
  
  const { t } = useTranslate();

  return (
    <>
      <Head TopBar={<AuthBar />} title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm t={t} />
      </PageLayout>
    </>
  );
}

export default memo(Login);
