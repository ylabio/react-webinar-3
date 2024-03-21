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
import HeadLogin from '../../components/head-login';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const select = useSelector((state) => ({
    auth: state.user.auth,
    error: state.user.error,
    username: state.user.user.name,
  }));

  const callbacks = {
    onLoguot: useCallback(() => {
      store.actions.user.logout();
    }, [store]),
    clearError: useCallback(() => {
      store.actions.user.clearErrorMessage();
    }, [store])
  }

  useEffect(() => {
    callbacks.clearError();
  }, [])

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <HeadLogin auth={select.auth} onClick={callbacks.onLoguot} username={select.username}/>
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
