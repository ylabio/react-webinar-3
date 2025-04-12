import { memo, useCallback, useEffect, useState } from 'react';
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
  const [currenCat, setCurrenCat] = useState('');
  const linksNav = {
    in: '/login',
    me: '/profile',
    out: '/',
  };

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
    category: state.catalog.params.category,
    categoryList: state.catalog.categories,
  }));

  const callbacks = {
    onLogout: useCallback(
      token => {
        store.actions.auth.logout(token);
      },
      [store],
    ),
  };
  const { t } = useTranslate();

  useEffect(() => {
    if (token && !select.isAuth) {
      store.actions.auth.checkAuth(token);
    }
    const current = select.categoryList.find(c => c._id === select.category);
    setCurrenCat(current?.title);
    document.title = `${t('title')}${current?.title ? ` / ${current.title}` : ''}`;
  }, [select.category]);

  return (
    <>
      <ProfileHeader
        isAuth={select.isAuth}
        userName={select.userName}
        onClick={() => callbacks.onLogout(token)}
        links={linksNav}
      />
      <Head title={`${t('title')}${currenCat ? ` / ${currenCat}` : ''}`}>
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
