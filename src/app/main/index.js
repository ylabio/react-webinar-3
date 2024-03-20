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
import LoginLine from '../../components/login-line';
import { useNavigateToLogin } from '../../hooks/use-navigate-to-login';
import useSelector from "../../hooks/use-selector";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const userState = useSelector(state => state.user);

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const { t } = useTranslate();
  
  const navigateToLogin = useNavigateToLogin();

  return (
    <PageLayout>
      <LoginLine onClick={navigateToLogin} buttonName={userState && userState?.username ? 'Выход' : 'Вход'}/>
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
