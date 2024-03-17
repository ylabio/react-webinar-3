import React, { useState, memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LoginInput from "../../components/login-input";
import AuthBtn from "../../components/auth-btn";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";

const Login = () => {
  const [dataAuth, setDataAuth] = useState({ login: "", password: "" });

  const store = useStore();

  const select = useSelector((state) => ({
    waiting: state.auth.waiting,
    error: state.auth.error,
  }));

  const callbacks = {
    onLogin: useCallback(
      (e) => {
        e.preventDefault();
        store.actions.auth.login(dataAuth);
      },
      [store, dataAuth]
    ),
    onChange: useCallback(
      (name, value) => {
        setDataAuth((prev) => ({ ...prev, [name]: value }));
      },
      [store]
    ),
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthBtn />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginInput
        dataAuth={dataAuth}
        onInputChange={callbacks.onChange}
        onLogin={callbacks.onLogin}
        error={select.error}
        loading={select.waiting}
        t={t}
      />
    </PageLayout>
  );
};

export default memo(Login);
