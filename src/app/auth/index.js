import {memo, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Header from "../../containers/header";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../containers/login-form";

/**
 * Страница авторизации
 */
function Authorization() {
  const navigate = useNavigate();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    isLogged: state.auth.isLogged,
  }));

  useEffect(() => {
    if (select.isLogged) navigate(-1, {replace: true});
  }, [select.isLogged])

  return (
    <PageLayout>
      <Header/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm/>
    </PageLayout>
  );
}

export default memo(Authorization);
