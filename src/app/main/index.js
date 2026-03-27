import { memo, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useDynamicTitle from '../../hooks/use-title';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import AuthContainer from '../../containers/auth';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const { getTitle } = useDynamicTitle();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  useEffect(() => {
    document.title = getTitle();
  }, [getTitle]);


  return (
    <>
      <AuthContainer />
      <Head title={getTitle()}>
        <LocaleSelect /> 
      </Head>
      <PageLayout>
        <Navigation />
        <CatalogFilter />
        <CatalogList />
      </PageLayout>
    </>
  );
}

export default memo(Main);
