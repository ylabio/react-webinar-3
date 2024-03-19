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
import HeadProfile from '../../components/head-profile';
import useSelector from '../../hooks/use-selector';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const navigate = useNavigate();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.categories.initList();
    store.actions.login.initParams();
    store.actions.profile.initProfile();
  }, [], true);

  const select = useSelector(state => ({
    validation: state.login.validation,
    name: state.profile.name,
    authorized: state.login.authorized
  }));

  const callbacks = {
    onLogOut: useCallback(() => store.actions.login.logOut(), [store]),
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <HeadProfile onClick={select.authorized ? callbacks.onLogOut : () => navigate('/login')}
      title={t(select.authorized ? 'login.exit' : 'login.entry')}>
        {select.authorized && <Link to='/profile'>{select.name}</Link>}
      </HeadProfile>
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
