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
import useSelector from '../../hooks/use-selector';
import ProfileHeader from '../../components/profile-header';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const token = localStorage.getItem('token');
  const linksNav = {
    in: '/login',
    me: '/profile',
    out: '/',
  };

  const callbacks = {
    onLogout: useCallback(
      token => {
        store.actions.auth.logout(token);
      },
      [store],
    ),
  };

  useEffect(() => {
    if (token && !select.isAuth) {
      store.actions.auth.checkAuth(token);
    }
  }, []);
  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );
  const select = useSelector(state => ({
    userName: state.auth.userName,
    isAuth: state.auth.isAuth,
  }));

  const { t } = useTranslate();

  return (
    <>
      <ProfileHeader
        isAuth={select.isAuth}
        userName={select.userName}
        onClick={() => callbacks.onLogout(token)}
        links={linksNav}
      />
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
