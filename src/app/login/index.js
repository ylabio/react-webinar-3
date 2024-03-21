import React, {useCallback} from 'react';
import useStore from "../../hooks/use-store";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import PageLayout from "../../components/page-layout";
import Authorization from "../../components/authorization";
import useSelector from "../../hooks/use-selector";
import AuthorizationForm from "../../components/authorization-form";
import useTranslate from "../../hooks/use-translate";
import {Navigate} from "react-router-dom";

function Login(props) {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.profile.profile,
    isAuth: state.user.isAuth,
    waiting: state.user.waiting,
    error: state.user.error
  }));
  console.log(select.user)

  const callbacks = {
    // Отправка данных формы регистрации
    onSubmit: useCallback(({login, password}) => store.actions.user.login({login, password}), [])
  }
  const {t} = useTranslate();

  if (select.isAuth) {
    return (<Navigate to={'/'} />)
  }

  return (
    <PageLayout>
      <Authorization login={select.user.profile?.name} isAuth={select.isAuth} title={'Вход'} />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <AuthorizationForm isAuth={select.isAuth} onSubmit={callbacks.onSubmit} error={select.error} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default Login;