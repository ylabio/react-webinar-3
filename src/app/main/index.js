import { memo, useState, useEffect, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import LoginEntry from '../../containers/login-entry';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const { t } = useTranslate();

  const store = useStore();
  const select = useSelector(state => ({
      categories: state.catalog.categories,
      category: state.catalog.params.category,
      params: state.catalog.params,
  }));

  const callbacks = {
    onFilter: useCallback(categoryId => {
      const selectedCategory = select.categories.find(category => {
        return category._id === categoryId
      });
      const category = categoryId;
      store.actions.catalog.setParams({ category, page: 1 });
      setSelectedCategory(selectedCategory ? selectedCategory.title : 'Все');
    }, [store, select.categories]),
  };

  useEffect(() => {
    const title = selectedCategory === 'Все' ? 'Магазин' : `Магазин / ${selectedCategory}`;
    document.title = title;
  }, [store, selectedCategory]);

  return (
    <>
      <LoginEntry />
      <Head title={selectedCategory === 'Все' ? t('title') : `${t('title')} / ${selectedCategory}`}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <CatalogFilter onCategoryChange={callbacks.onFilter} />
        <CatalogList />
      </PageLayout>
    </>
  );
}

export default memo(Main);
