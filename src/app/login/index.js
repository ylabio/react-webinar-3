import {memo, useCallback, useMemo} from 'react';
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
import {Navigate} from "react-router-dom";


function Login() {
  const store = useStore();
  const select = useSelector(state => ({
    loggedIn: state.auth.loggedIn,
    waiting: state.article.waiting,
  }));


  const callbacks = {
    signIn: useCallback(({login, password}) => store.actions.auth.signIn({login, password}), [store]),
  }

  const {t} = useTranslate();
  if (select.loggedIn) return <Navigate to={'/'}/>



  return (
    <PageLayout>
      <UserPanel loggedIn={select.loggedIn} title={select.loggedIn ? t('exit') : t('enter')}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <LoginForm  t={t} onSubmit={callbacks.signIn}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
