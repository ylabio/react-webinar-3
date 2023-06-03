import {memo, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../containers/login-menu";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LoginForm from "../../components/login-form";

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    status: state.login.status,
    userName: state.login?.user?.username,
    error: state.login.error,
  }));

  useEffect(() => {
    if (select.status === 'auth') {
      navigate(-1);
    }
  }, [select.status]);

  useEffect(() => {
    return () => {
      store.actions.login.reset();
    };
  }, []);

  const callbacks = {
    // Авторизация
    login: useCallback((data) => store.actions.login.login(data), [store]),
  }

  return (
    <PageLayout>
      <LoginMenu/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm error={select.error} onLogin={callbacks.login} t={t}/>
    </PageLayout>
  );
}

export default memo(Login);
