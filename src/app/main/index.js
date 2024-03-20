import { memo, useCallback } from 'react'
import AccountBlock from '../../components/account-block'
import useSelector from '../../hooks/use-selector'
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();


  const select = useSelector(state => ({
    user: state.profile.data
  }));

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const callbacks = {
    onLogout: useCallback(() => store.actions.profile.logout(), [store]),
    setUrl: useCallback((url) => store.actions.router.setUrl(url), [store])
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AccountBlock t={t} onLogout={callbacks.onLogout} username={select.user?.profile?.name} setUrl={callbacks.setUrl}/>
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
