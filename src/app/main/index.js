import {memo} from "react";
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

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    category: state.catalog.defaultCategory,
  }));

  const {t} = useTranslate();

  return (
    <>
      <Head title={t("title")} categoryName={select.category._id === "all" ? null : `/ ${select.category.title}`}>
        <LocaleSelect/>
      </Head>
      <PageLayout>
        <Navigation/>
        <CatalogFilter/>
        <CatalogList/>
      </PageLayout>
    </>
  );
}

export default memo(Main);
