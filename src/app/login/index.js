import React, { memo, useCallback, useState } from "react";
import PageLayout from "../../components/page-layout";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import Header from "../../containers/header";
import Authorization from "../../components/authorization";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { Navigate } from "react-router-dom";

const Login = () => {
  const store = useStore();
  const { t } = useTranslate();
  const select = useSelector((state) => ({
    error: state.login.error,
    token: state.login.token,
  }));
  
  const callbacks = {
    signIn: useCallback((login, password) =>
      store.actions.login.sign(login, password)
    ),
  };

  return (
    <PageLayout>
      <Header />
      <Navigation />
      <Authorization
        pass={t("password")}
        loginText={t("loginText")}
        sign={t("sign")}
        signIn={callbacks.signIn}
        error={select.error}
      />
      {select.token&&(<Navigate to={'/profile'}/>)}
    </PageLayout>
  );
};

export default memo(Login);
