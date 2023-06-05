import React, { useEffect } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../containers/login-form";
import LoginMenu from "../../containers/login-menu";
import Navigation from "../../containers/navigation";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

const Login = () => {
  const { t } = useTranslate();
  const store = useStore();

  useEffect(() => {
    return () => store.actions.login.setError("");
  }, []);

  return (
    <PageLayout>
      <LoginMenu />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm />
    </PageLayout>
  );
};

export default Login;