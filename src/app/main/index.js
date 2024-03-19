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
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import AuthBar from '../../components/auth-bar';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.category.load();
  }, [], true);

  const select = useSelector(state => ({
    categories: state.category.data.items,
    waiting: state.category.waiting,
    user: state.auth.user,
  }));

  const {t} = useTranslate();

  const callbacks = {
    logout: useCallback(() => store.actions.auth.logout(), [store]),
  }

  return (
    <PageLayout>
      <AuthBar t={t} logout={callbacks.logout} user={select.user}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <CatalogFilter categories={select.categories}/>
      </Spinner>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
