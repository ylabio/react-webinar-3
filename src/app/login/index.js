import { memo } from 'react';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import useTitle from '../../hooks/use-title';

import Auth from '../../components/auth';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import AuthForm from '../../components/auth-form';

function Login() {
  const { t } = useTranslate();
  useTitle(t('title'));

  return (
    <>
      <Auth />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <AuthForm />
      </PageLayout>
    </>
  );
}

export default memo(Login);
