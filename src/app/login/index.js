import { memo, useEffect } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../containers/login-form';
import LoginPanel from '../../containers/login-panel';
import { Navigate } from 'react-router-dom';

function Login() {

  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm />
    </PageLayout>
  );
}

export default memo(Login);
