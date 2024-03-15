import {memo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';
import useTranslate from "../../hooks/use-translate";
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

  const {isAuthorized} = useAuth();

  useEffect(() => {
    if (isAuthorized) {
      navigate('/', { replace: true });
    }
  }, [isAuthorized])

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
