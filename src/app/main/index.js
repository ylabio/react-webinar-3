import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import LoginButton from "../../components/login-button";

function Main() {
  const store = useStore();

  const token = JSON.parse(localStorage.getItem("token"));

  useInit(
    () => {
      store.actions.catalog.initParams();
      if (token) {
        store.actions.user.loadData(token);
      }
    },
    [store, token],
    true
  );

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userName = useSelector((state) => ({ ...state.user.user.profile }));

  const { t } = useTranslate();

  const exitProfile = useCallback(() => {
    store.actions.user.exit();
    localStorage.clear();
  }, [store]);

  return (
    <PageLayout
      head={
        <LoginButton
          isAuthenticated={isAuthenticated}
          text={userName.name}
          onExit={exitProfile}
        />
      }
    >
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
