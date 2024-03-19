import {memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTranslate from "../../hooks/use-translate";
import useSelector from '../../hooks/use-selector';
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import AppAuth from '../../containers/app-auth';
import LocaleSelect from "../../containers/locale-select";
import AuthForm from '../../containers/auth-form';

/**
 * Страница авторизации
 */
function Login() {

  const {t} = useTranslate();

  const navigate = useNavigate();

  const location = useLocation();

  const select = useSelector(state => ({
    auth: state.auth.auth
  }));

  useEffect(() => {
    if (select.auth) {
      navigate(location.state || '/', {replace: true});
    }
  }, [select.auth])

  return (
    <PageLayout>
      <AppAuth />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <AuthForm />
    </PageLayout>
  );
}

export default memo(Login);
