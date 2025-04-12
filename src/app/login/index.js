import React from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import LoginForm from '../../components/login-form'

const Login = () => {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm />
      </PageLayout>
    </>
  );
};

export default Login;
