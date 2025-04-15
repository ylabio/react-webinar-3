import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import LoginMenu from '../login-menu';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main({categoryTitle = ''}) {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.catalog.categoryLoad();
      store.actions.authorization.clearError();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  return (
    <>
      <LoginMenu />
      <Head title={t('title') + (categoryTitle ? ' / ' + categoryTitle : '')}>
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
