import { memo, useEffect, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import UserButton from '../../containers/user-button';
import UserPanel from '../../components/user-panel';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categories: state.categories.categories,
  }));
  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.categories.loadCategories();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  const selectedPageTitle = useMemo(() => {
    if (!select.category) {
      return t('title');
    }

    const category = select.categories.find(item => item._id === select.category);

    return category ? `${t('title')} / ${category.title}` : t('title');
  }, [select.category, select.categories, t]);

  useEffect(() => {
    document.title = selectedPageTitle;
  }, [selectedPageTitle]);

  return (
    <>
      <UserPanel>
        <UserButton />
      </UserPanel>
      <Head title={selectedPageTitle}>
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
