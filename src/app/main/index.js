import { memo, useEffect, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import UserNavigation from '../../containers/user-navigation';
import useSelector from '../../hooks/use-selector';

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

  const activeCategory = useMemo(() => {
    if (!select.category) {
      return t('title');
    }

    const category = select.categories.find(category => category.value === select.category);
    return category ? `${t('title')} / ${category.title.replace(/^-+/, '')}` : t('title');
  }, [select.category, select.categories, t]);

  useEffect(() => {
    document.title = activeCategory;
  }, [activeCategory]);

  return (
    <>
      <UserNavigation />
      <Head title={activeCategory}>
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
