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
import AuthInfo from "../../components/user/auth-info";
import useSelector from "../../hooks/use-selector";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.catalog.fetchCategories();
      store.actions.user.checkAuth();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categories: state.catalog.categories,
  }));

  // Обновление заголовка страницы в зависимости от выбранной категории

  useEffect(() => {
    const categoryTitle = select.category ? select.categories.find(cat => cat._id === select.category)?.title : '';
    document.title = categoryTitle ? `Магазин / ${categoryTitle}` : 'Магазин';
  }, [select.category, select.categories]);

  return (
    <>
      <AuthInfo />
      <Head title={t('title')}>
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
