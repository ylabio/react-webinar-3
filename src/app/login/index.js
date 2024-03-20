import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginPage from "../login-page";

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Login() {
  const store = useStore();

  const { t } = useTranslate();

  const callbacks = {
    // Удаление из корзины
    getInfo: useCallback(() => store.actions.users.getInfo(), [store]),

    // Добавление в корзину
    initParams: useCallback(() => store.actions.users.initParams(), [store]),
    // Открытие модалки корзины
    resetParams: useCallback(() => store.actions.users.resetParams(), [store]),
    setLogin: useCallback((login) => store.actions.users.setLogin(login), [
      store,
    ]),
    setPassword: useCallback(
      (password) => store.actions.users.setPassword(password),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginPage getInfo={callbacks.getInfo} initParams={callbacks.initParams} resetParams={callbacks.resetParams} setLogin={callbacks.setLogin} setPassword={callbacks.setPassword} />
    </PageLayout>
  );
}

export default memo(Login);
