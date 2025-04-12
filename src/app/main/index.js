import { memo, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useAuthSlotProps from '../../hooks/use-auth-slot';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import AuthSlot from '../../components/auth-slot';
import AppLayout from '../../components/app-layout';
import LocaleSelect from '../../containers/locale-select';

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
  const categories = useSelector(state => state.category.list || []);
  const selectedCategory =
    categoryId && categories.length > 0 ? categories.find(c => c._id === categoryId) : null;

  const categoryTitle = selectedCategory ? t(`category.${selectedCategory.title}`) : t('title');

  useEffect(() => {
    document.title =
      categoryId && selectedCategory ? `${t('title')} / ${categoryTitle}` : t('title');
  }, [categoryId, selectedCategory, categoryTitle, t]);

  const { isLoading, isAuthorized, isUnauthorized, username, handleLogout } = useAuthSlotProps();

  const pageTitle =
    categoryId && selectedCategory ? `${t('title')} / ${categoryTitle}` : t('title');

  const auth = (
    <AuthSlot
      isLoading={isLoading}
      isAuthorized={isAuthorized}
      isUnauthorized={isUnauthorized}
      username={username}
      onLogout={handleLogout}
    />
  );

  return (
    <AppLayout title={pageTitle} authSlot={auth} headChildren={<LocaleSelect />}>
      <PageLayout>
        <Navigation />
        <CatalogFilter />
        <CatalogList />
      </PageLayout>
    </AppLayout>
  );
}

export default memo(Main);
