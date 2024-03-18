import {memo, useCallback, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import Authorization from "../../components/authorization";
import useSelector from "../../hooks/use-selector";
import {Navigate} from "react-router-dom";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.user,
    isAuth: state.user.isAuth
  }))

  const callbacks = {
    // Выход из профиля
    onLogout: useCallback(() => store.actions.user.signOut(), [store]),
  }

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.category.load();
  }, [], true);

  const {t} = useTranslate();

  if (!select.isAuth) {
    return (<Navigate to={'/login'} />)
  }

  return (
    <PageLayout>
      <Authorization isAuth={select.isAuth} login={select.user.profile?.name}
                     profile={'/profile'} link={select.isAuth ? '' : '/login'}
                     title={select.isAuth ? 'Выход' : 'Вход'} onLogout={callbacks.onLogout} />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
