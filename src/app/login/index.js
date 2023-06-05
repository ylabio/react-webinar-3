import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../containers/login-form";
import LoginMenu from "../../containers/login-menu";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import {useEffect} from "react";
import useStore from "../../hooks/use-store";

const Login = () => {

  const store = useStore();

  useEffect(() => {
    return () => store.actions.login.setError("");
  }, []);

  const {t} = useTranslate();

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