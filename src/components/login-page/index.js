import React, { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Head from '../head';
import LocaleSelect from '../../containers/locale-select';
import PageLayout from "../page-layout";
import LoginHeader from "../login-header";
import Navigation from '../../containers/navigation';
import LoginForm from "../../components/login-form";

function LoginPage() {
  const { t } = useTranslate();
  
  return (
    <>
      <LoginHeader />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm />
      </PageLayout>
    </>

  );
}

export default memo(LoginPage);