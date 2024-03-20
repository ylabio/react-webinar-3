import {memo} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import HeaderAuth from '../../containers/header-auth';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.categories.load();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <HeaderAuth />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      {/* <Header /> */}
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
