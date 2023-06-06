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
import Auth from '../../components/auth';
import useSelector from '../../hooks/use-selector';

function Main() {

  const store = useStore();
  const select = useSelector(state => ({
    user: state.user.user,
    isAuth: state.user.isAuth,
  }));

	const callbacks = {
		signOut: useCallback(() => store.actions.user.signOut(), [store]),
	};

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.categories.getCategories();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Auth user={select.user ? select.user : ''} isAuth={select.isAuth} signOut={callbacks.signOut}/>
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
