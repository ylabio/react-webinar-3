import { memo, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import TopBar from '../../containers/top-bar';
import useSelector from '../../hooks/use-selector';
import { getFullPath } from '../../utils';

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
    categoryId: state.catalog.params.category,
    categories: state.categories.list,
  }));

  const pathCategory = getFullPath(select.categories, select.categoryId)
  const headTitle = pathCategory === 'Все' ? 'title' : pathCategory;

  useEffect(() => {
    document.title = t(headTitle);
  }, [headTitle]);

  const { t } = useTranslate();

  return (
    <>
      <TopBar />
      <Head title={t(headTitle)}>
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
