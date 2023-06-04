import {memo} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import useSelector from "../../hooks/use-selector";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import TopHead from '../../components/top-head';
import AuthLink from '../../components/auth-link';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    user: state.auth.user,
  }));

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.auth.getUserToken();
  }, [], true);
  
  const {t} = useTranslate();

  return (
    <PageLayout>
      <TopHead>
        <AuthLink user={select.user} />
      </TopHead>
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
