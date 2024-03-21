import { memo, useCallback, useMemo } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import { LoginForm } from '../../components/login-form';
import UserBar from '../../components/user-bar';


/**
 * Страница авторизации
 */
function Login() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    userName: state.auth.user?.name,
    error: state.auth.error,
    waiting: state.auth.waiting,
  }));

  const callbacks = {
    login: useCallback(body => store.actions.auth.login(body), [store]),
    logOut: useCallback(() => store.actions.auth.logOut(), [store]),
  };

  return (
    <PageLayout>
      <UserBar name={select.userName} logOut={callbacks.logOut} />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginForm onSubmitForm={callbacks.login} error={select.error}
          buttonText={t("button.enter")} title={t("login.title")} login={t("login.login")}
          password={t("login.password")} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
