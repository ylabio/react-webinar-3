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
  const [currenCat, setCurrenCat] = useState('');

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.categories.fetchCategories();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    user: state.user.user,
    isAuth: state.user.isAuth,
    token: state.user.token,
    category: state.catalog.params.category,
    categoryList: state.categories.list,
  }));
  const callbacks = {
    onLogout: useCallback(
      token => {
        store.actions.user.logout(token);
      },
      [store],
    ),
  };
  const { t } = useTranslate();

  useEffect(() => {
    const current = select.categoryList.find(c => c._id === select.category);
    setCurrenCat(current?.title);
    document.title = `${t('title')}${current?.title ? ` / ${current.title}` : ''}`;
    return () => {
      document.title = t('title');
    };
  }, [select.category]);

  return (
    <>
      <ProfileHeader
        isAuth={select.isAuth}
        userName={select.user?.profile.name}
        onClick={() => callbacks.onLogout(select.token)}
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
