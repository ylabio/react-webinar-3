import { memo, useEffect, useMemo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import AuthNavigation from '../../containers/auth-navigation';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categories: state.catalog.categories,
  }));

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.catalog.loadCategories();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  // Убираем дефисы из названий категорий
  const cleanCategoryTitle = title => {
    return title.replace(/^-+/, '');
  };

  const selectedCategoryTitle = useMemo(() => {
    if (!select.category) {
      return t('title');
    }
    const category = select.categories.find(category => category.value === select.category);
    return category ? `${t('title')} / ${cleanCategoryTitle(category.title)}` : t('title');
  }, [select.category, select.categories, t]);

  useEffect(() => {
    document.title = selectedCategoryTitle;
  }, [selectedCategoryTitle]);

  return (
    <>
      <AuthNavigation />
      <Head title={selectedCategoryTitle}>
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
