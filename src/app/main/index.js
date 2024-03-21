import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.login.initParams();
  }, [], true);

  const select = useSelector(state => ({
    isAuth: state.login.isAuth,
    user: state.login.user
  }));

  const callbacks = {
    // Выйти из аккаунта
    removeAuthorization: useCallback(body =>
      store.actions.login.removeAuthorization(body), [store]),
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Head title={t('title')} enter={t('enter')} exit={t('exit')} isAuth={select.isAuth}
            removeAuthorization={callbacks.removeAuthorization} user={select.user}
            link='/profile'>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
