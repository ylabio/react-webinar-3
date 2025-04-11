import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import useTitle from '../../hooks/use-title';

import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import useSelector from '../../hooks/use-selector';

import Auth from '../../components/auth';
import Head from '../../components/head';

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

  const { t } = useTranslate();

  useTitle(select.category._id === 'all' ? t('title') : `${t('title')} / ${select.category.title}`);

  return (
    <>
      <Auth />
      <Head
        title={t('title')}
        categoryName={select.category._id === 'all' ? null : ` / ${select.category.title}`}
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
