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
import AuthHeader from '../../components/auth-header';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main(props) {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.categories.initCategories();
  }, [], true);
  const callbacks = {
    onSignOut: () => props.onLogout(),
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthHeader
        token={props.token}
        buttonTitle={props.isLoggedIn ? 'Выход' : 'Вход'}
        link={props.isLoggedIn ? '/profile' : '/login'}
        onSignOut={callbacks.onSignOut}
        userName={props.userName}
      />
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
