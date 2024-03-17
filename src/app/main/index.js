import {memo} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import NavigationLogin from "../../containers/navigation-login";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();
  
  useInit(() => {
    store.actions.catalog.initParams(store.actions.user.getState().token);
    store.actions.user.fGetDataUser(store.actions.catalog.getState().params.token);
    if (store.actions.user.getState().waiting == true) {
      let vCount = 0;
      while (vCount < 1000) {
        if (store.actions.user.getState().waiting == false)
          store.actions.catalog.initParams(store.actions.user.getState().token);
        vCount += 1;
      }
    }
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <NavigationLogin/>
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
