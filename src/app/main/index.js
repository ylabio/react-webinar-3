import {memo, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import HeadAuthContainer from '../../containers/head-auth-container';
  


function Main() {
  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  useEffect(()=>{
    store.actions.categories.fetchCategories()
  }, []);

  const {t} = useTranslate();

  return (
    <PageLayout>
    <HeadAuthContainer />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
