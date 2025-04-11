import { memo, useCallback, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import UserMenu from '../../components/user-menu';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const navigate = useNavigate();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.catalog.loadCategories();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  const select = useSelector(state => ({
    username: state.login.username,
    isAuth: state.login.isAuth,
    category: state.catalog.params.category,
    categories: state.catalog.categories,
  }));

  const callbacks = {
    onNavigate: useCallback(() => navigate('/login'), [store]),
    onLogout: useCallback(() => store.actions.login.logout(), [store]),
  };

  const currentCategory = select.category
    ? select.categories.find(item => item.value === select.category)?.justTitle
    : null;

  const categoryTitle = currentCategory ? `${t('title')} / ${currentCategory}` : t('title');

  useEffect(() => {
    document.title = categoryTitle;
  }, [categoryTitle]);

  return (
    <>
      <UserMenu
        onLogout={callbacks.onLogout}
        onNavigate={callbacks.onNavigate}
        username={select.username}
        isAuth={select.isAuth}
        t={t}
      />
      <Head title={categoryTitle}>
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
