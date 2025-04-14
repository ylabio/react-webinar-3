import { memo, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import useSelector from '../../hooks/use-selector'
import useInit from '../../hooks/use-init';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categoryList: state.category.list
  }))

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.category.loadCategoryList()
    },
    [],
    true,
  );
  
  const { t } = useTranslate();
  
  const  currentCategory  = select.category 
    ? select.categoryList.find(category => category._id === select.category)?.title 
    : null
  
  const currentTitle = currentCategory 
    ? `${t('title')} / ${currentCategory }` 
    : t('title')
  
  useEffect(() => {
    document.title = currentTitle
  }, [store.state.catalog])

  return (
    <>
      <Head title={currentTitle}>
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
