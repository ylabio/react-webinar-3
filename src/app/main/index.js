import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth-tool";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  const { t, lang, setLang } = useTranslate();

  useInit(
    () => {
      store.actions.catalog.initParams({ lang });
      store.actions.categories.load(lang);
    },
    [lang],
    true
  );

  const callbacks = {
    setLang: useCallback(
      (lang) => {
        store.actions.catalog.setParams({ lang });
        setLang(lang);
      },
      [store, lang]
    ),
  };

  return (
    <PageLayout head={<Auth />}>
      <Head title={t("title")}>
        <LocaleSelect onChange={callbacks.setLang} value={lang} />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
