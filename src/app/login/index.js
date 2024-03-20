import {memo, useCallback, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import UserPanel from "../../components/user-panel";
import LoginForm from "../../components/login-form";
import {useNavigate} from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const store = useStore();
  const select = useSelector(state => ({
    loggedIn: state.auth.loggedIn,
    waiting: state.article.waiting,
    error: state.auth.error
  }));

  const callbacks = {
    signIn: useCallback(({login, password}) => store.actions.auth.signIn({login, password}), [store]),
    dropError: useCallback(() => store.actions.auth.dropError(), [store]),
  }

  useEffect(() => {
    callbacks.dropError()
  }, [])

  const {t} = useTranslate();

  useEffect(() => {
    if (select.loggedIn) {
      navigate(-1);
    }
  }, [select.loggedIn, navigate]);

  return (
    <PageLayout>
      <UserPanel loggedIn={select.loggedIn} title={select.loggedIn ? t('exit') : t('enter')}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <LoginForm t={t} error={select.error} onSubmit={callbacks.signIn} dropError={callbacks.dropError}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
