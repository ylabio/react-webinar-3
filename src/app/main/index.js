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
import SideLayout from "../../components/side-layout";
import Button from "../../components/Button";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  const { t, lang } = useTranslate();

  useInit(
    () => {
      store.actions.catalog.initParams({ lang });
    },
    [lang],
    true
  );

  return (
    <PageLayout
      head={
        <SideLayout side="end" padding="10x20">
          <Button label={t("login")} />
        </SideLayout>
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
