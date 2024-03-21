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
import {Navigate} from "react-router-dom";


/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    loggedIn: state.auth.loggedIn,
    token: state.auth.token,
    user: state.user.user
  }));

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.user.fetchUser(select.token);
  }, [select.loggedIn, select.token], true);

  const callbacks = {
    signOut: useCallback(() => store.actions.auth.signOut(), [store]),
  }


  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserPanel userName={select.user?.profile?.name} callBack={select.loggedIn ? callbacks.signOut : undefined}
                 loggedIn={select.loggedIn}
                 profile={'/profile'}
                 buttonPath={!select.loggedIn ? '/login' : ''}
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
