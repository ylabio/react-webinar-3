import { memo, useCallback, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginPage from "../../components/login-page";

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Login() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true
  );

  const { t } = useTranslate();


  const callbacks = {
    // Удаление из корзины
    getInfo: useCallback(() => store.actions.users.getInfo(), [store]),
  };

  return (
    <PageLayout>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginPage />
    </PageLayout>
  );
}

export default memo(Login);
