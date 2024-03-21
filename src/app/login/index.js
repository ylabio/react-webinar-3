import { memo, useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import Authorization from "../../containers/authorization";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Страница логин формы
 */
function Login() {
  const store = useStore();
  const token = localStorage.getItem("token");
  const location = useLocation();

  const select = useSelector((state) => ({
    error: state.session.error,
    authorized: state.session.authorized,
  }));

  const { t } = useTranslate();

  useEffect(() => {
    return store.actions.user.clearError();
  }, [store]);

  const callbacks = {
    onLogin: useCallback(
      (authData) => {
        store.actions.session.getToken(authData);
      },
      [store]
    ),
  };

  return token ? (
    <Navigate to={location.state ? location.state.prev : "/profile"} />
  ) : (
    <PageLayout>
      <Authorization />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm error={select.error} onLogin={callbacks.onLogin} t={t} />
    </PageLayout>
  );
}

export default memo(Login);
