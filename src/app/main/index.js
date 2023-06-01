import { memo } from 'react';
import Head from "../../components/head";
import PageLayout from "../../components/layouts/page-layout";
import CatalogFilter from "../../containers/catalog/catalog-filter";
import CatalogList from "../../containers/catalog/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import LoginBar from '../../containers/login-bar';
import Navigation from "../../containers/navigation";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginBar />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
