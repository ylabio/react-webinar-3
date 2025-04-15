import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import { useSession } from '../../hooks/use-session';
import { useUser } from '../../hooks/use-user';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import PageLayout from "../../components/page-layout";
import LoginHeader from '../../containers/login-header-container';
import Navigation from '../../containers/navigation';
import LoginForm from "../../containers/login-form-container";

function LoginPage() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { token } = useSession();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && token && user) {
      navigate('/');
    }
  }, [loading, token, user, navigate]);

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
