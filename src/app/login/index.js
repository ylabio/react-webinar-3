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

/**
 * Страница логин формы
 */
function Login() {
  const store = useStore();

  const select = useSelector((state) => ({
    error: state.user.error,
  }));

  const { t } = useTranslate();

  useEffect(() => {
    return store.actions.user.clearError();
  }, [store]);

  const callbacks = {
    onLogin: useCallback(
      (authData) => {
        store.actions.user.getToken(authData);
      },
      [store]
    ),
  };

  return (
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
