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
import AuthBar from '../../components/auth-bar';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    categoryId: state.catalog.params.category,
    rawCategoryList: state.category.rawCategoryList,
  }));

  const category = select.rawCategoryList.find(item => item._id === select.categoryId);
  const categoryTitle = category?.title

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  return (
    <>
      <Head
        title={`${t('title')}${categoryTitle && categoryTitle !== 'Все' ? ` / ${categoryTitle}` : ''}`}
        TopBar={<AuthBar />}
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
