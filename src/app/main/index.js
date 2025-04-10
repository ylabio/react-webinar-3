import { memo, useEffect } from 'react';
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
import AuthSlot from '../../components/auth-slot';

function Main() {
  const store = useStore();
  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  const categoryId = useSelector(state => state.catalog.params.category);
  const categories = useSelector(state => state.catalog.categories || []);

  const selectedCategory = categoryId ? categories.find(c => c._id === categoryId) : null;

  const categoryTitle = selectedCategory ? t(`category.${selectedCategory.title}`) : t('title');

  useEffect(() => {
    document.title = categoryId ? `${t('title')} / ${categoryTitle}` : t('title');
  }, [categoryId, categoryTitle, t]);

  return (
    <>
      <Head
        title={categoryId ? `${t('title')} / ${categoryTitle}` : t('title')}
        authSlot={<AuthSlot />}
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
