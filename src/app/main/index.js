import { memo, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const { t } = useTranslate();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const { category } = useSelector(state => state.catalog.params);
  const categoryTitle = category
    ? store.actions.catalog.getCategoryTitle(category)
    : null;

  const pageTitle = categoryTitle
    ? `${t('title')} / ${categoryTitle}`
    : t('title');

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <>
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
