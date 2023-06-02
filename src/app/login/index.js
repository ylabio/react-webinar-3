import React, { useCallback } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import UserInfo from "../../containers/user-header";
import Form from "../../components/form";

const Login = () => {
  const store = useStore();

  const { t } = useTranslate();

  const callbacks = {
    onLogin: useCallback((data) => store.actions.user.userLogin(data), [store]),
  };

  const inputs = [
    {
      name: "login",
      label: t("input.login"),
      type: "text",
      required: true,
    },
    {
      name: "password",
      label: t("input.password"),
      type: "password",
      required: true,
    },
  ];

  return (
    <PageLayout>
      <UserInfo />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Form
        inputs={inputs}
        title={t("login")}
        onSubmit={callbacks.onLogin}
        submitButton={t("login.button")}
      />
    </PageLayout>
  );
};

export default Login;
