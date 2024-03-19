import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/login-form";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import LoginControl from "../../containers/login-control";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";

function Login() {
  const { t } = useTranslate();

  const store = useStore();

  const select = useSelector((state) => ({
    error: state.auth.error,
    waiting: state.auth.waiting,
  }));

  const callbacks = {
    onLogin: useCallback((login, password) => {
      store.actions.auth.login(login, password);
    }, []),
  };

  return (
    <PageLayout>
      <LoginControl />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginForm onSubmit={callbacks.onLogin} error={select.error} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
