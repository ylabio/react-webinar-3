import { memo } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import HeadTop from '../../components/head-top';
import AuthForm from '../../components/auth-form';
import useTranslate from '../../hooks/use-translate';

function Login() {
  const { t } = useTranslate();

  return (
    <>
      <HeadTop />
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
