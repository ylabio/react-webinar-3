import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import AuthBar from '../../components/auth-bar';
import { getCategoryTitleById } from '../../utils';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const navigate = useNavigate();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    user: state.user.user,
    category: state.catalog.params.category,
    categories: state.catalog.categories,
  }));

  const { t } = useTranslate();

  useEffect(() => {
    const categoryTitle = getCategoryTitleById(select.category, select.categories);
    document.title = `${t('title')}${categoryTitle}`;
  }, [select.category, select.categories, t]);

  const callbacks = {
    // Редирект на страницу login
    redirectToLogin: useCallback(() => navigate('/login'), [navigate]),
    // Выход пользователя
    onLogOut: useCallback(() => {
      store.actions.user.logOut();
      navigate('/');
    }, [store, navigate]),
  };

  return (
    <>
      <AuthBar
        buttonTitle={select.user ? t('logOut') : t('logIn')}
        userTitle={select.user?.username}
        onClickButton={select.user ? callbacks.onLogOut : callbacks.redirectToLogin}
      />
      <Head title={`${t('title')}${getCategoryTitleById(select.category, select.categories)}`}>
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
