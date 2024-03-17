import { memo } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";
import UserAuthPortal from "../../containers/user-auth-portal";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const data = useSelector((s) => ({
    cat: s.catalog,
  }));

  console.log(data, "data");
  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true
  );

  const { t } = useTranslate();

  return (
    <PageLayout>
      <UserAuthPortal />
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
