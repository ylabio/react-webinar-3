import {memo, useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/loginForm";
import './style.css';
import LoginButton from "../../components/LoginButton";

function Login() {
  const store = useStore();

  const select = useSelector((state) => ({
    error: state.user.error,
    user: state.user.user,
  }));

  const callbacks = {
    login: useCallback(
      async (data) => store.actions.user.login(data),
      [store]
    ),
    resetError: useCallback(
      async (data) => store.actions.user.resetError(),
      [store]
    ),
  };
   
  const onSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      login:  e.target[0].value,
      password:  e.target[1].value,
    }
    await callbacks.login(loginData);
  }

  useEffect(() => {
    return () => {callbacks.resetError()}
  }, [])

  return (
    <PageLayout>
      <LoginButton />
      <Head title={select?.article?.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
       <div className="Login-wrapper">
          <h2>Вход</h2>
          <LoginForm onSubmit={onSubmit} isSuccess={!!select.user} error={(select.error?.data && select.error?.data.issues[0].message) || (select.error && select.error.message)} />
       </div>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
