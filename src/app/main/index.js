import { memo } from 'react';

import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import useTitle from '../../hooks/use-title';
import useSelector from '../../hooks/use-selector';

import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';

import Head from '../../components/head';
import AuthLink from '../../components/auth-link';
import PageLayout from '../../components/page-layout';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.category.initParams();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    category: state.category.defaultCategory,
  }));

  const { t } = useTranslate();

  const categoryTitle = select.category.title || '';

  const pageName = select.category._id === 'all' ? t('title') : `${t('title')} / ${select.category.title.toLowerCase()}`

  useTitle(pageName);

  return (
    <>
      <AuthLink />
      <Head
        title={pageName}
      >
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
