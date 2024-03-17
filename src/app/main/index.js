import {memo, useCallback} from 'react';
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import UserPanel from "../../components/user-panel";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";


/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
  }));



  const callbacks = {
    signOut: useCallback(() => store.actions.auth.signOut(), [store]),
  }


  useInit(() => {
    store.actions.auth.fetchUser();
  }, [select.loggedIn], true);


  useInit(() => {
    store.actions.catalog.initParams();
  }, [select.loggedIn], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserPanel userName={select.user?.profile?.name} callBack={select.loggedIn ? callbacks.signOut : undefined} loggedIn={select.loggedIn}
                 profile={'/profile'}
                 login={'/login'}
                 title={select.loggedIn ? t('exit') : t('enter')}/>
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
