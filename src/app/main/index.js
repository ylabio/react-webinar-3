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
import LoginSide from "../../components/login-side";
import useSelector from "../../hooks/use-selector";

function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.category.getCategoryList();
  }, [], true);

  const select = useSelector(state => ({
    loginStatus: state.user.loginStatus,
    userName: state.user.userProfile.name
  }));

  const callbacks = {
    logout: useCallback(() => store.actions.user.logout(), [store])
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <LoginSide loginStatus={select.loginStatus} userName={select.userName} onLogout={callbacks.logout} t={t} />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
