import { memo, useEffect, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import Header from '../../containers/header';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.catalog.loadCategories();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  const select = useSelector(state => ({
    categories: state.catalog.categories,
    category: state.catalog.params.category,
  }));

  const headTitle = useMemo(() => {
    if (select.category.length !== 0 && select.categories.length !== 0) {
      const selectedCategory = select.categories.find((item) => item.value === select.category);
      const categoryTitle = selectedCategory.title.replaceAll('-', '');
      const result = `${t('title')} / ${categoryTitle}`;
      document.title = result;
      return result;
    }
    document.title = t('title');
    return t('title');
  }, [select.category, select.categories, t]);

  return (
    <>
      <Header />
      <Head title={headTitle}>
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
