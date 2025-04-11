import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import UserButton from '../../containers/user-button';
import UserPanel from '../../components/user-panel';
import usePageTitle from '../../hooks/use-pageTitle';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const pageTitle = usePageTitle({ useCatalogLogic: true });

  // Инициализация параметров каталога при монтировании
  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  return (
    <>
      <UserPanel>
        <UserButton />
      </UserPanel>
      <Head title={pageTitle}>
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
