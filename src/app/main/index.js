import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../containers/login-menu";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";

function Main() {
  const { t } = useTranslate();
	const store = useStore();

	useInit(
		() => {
			store.actions.categories.loadCategories();
			store.actions.catalog.initParams();
		},
		[],
		true
	);

  return (
    <PageLayout>
      <LoginMenu />
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
