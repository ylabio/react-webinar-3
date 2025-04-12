import { memo } from 'react';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';

import LoginForm from '../../containers/login-form';
import PageTitle from '../../components/page-title';
import useTranslate from '../../hooks/use-translate';

function LoginPage() {
  const { t } = useTranslate();

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <PageTitle title={t('login.title')} />
        <LoginForm />
      </PageLayout>
    </>
  );
}

export default memo(LoginPage);
