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

  const navigate = useNavigate();

  const select = useSelector((state) => ({
    error: state.user.error,
    user: state.user.user,
  }));

  const callbacks = {
    login: useCallback(
      async (data) => store.actions.user.login(data),
      [store]
    ),
  };
   
  const onSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      password:  e.target[0].value,
      login:  e.target[1].value,
    }
    await callbacks.login(loginData);
  }

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
          <LoginForm onSubmit={onSubmit} />
          <div>{select?.error?.message}</div>
       </div>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
