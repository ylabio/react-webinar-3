import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import HeadPage from "../../components/head-page";

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    authorization: state.user.authorization
  }));

  const userName = localStorage.getItem('userName')

  const callbacks = {
    // Выход
    deleteUser: useCallback(() => store.actions.user.deleteUser(), [store])
  }

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout head={<HeadPage authorization={select.authorization} exit={callbacks.deleteUser} userName={userName}/>}>
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
