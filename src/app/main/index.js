import {memo} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import LoginNav from '../../components/login-nav';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const navigate = useNavigate()
  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.catalog.getCategories();
  }, [], true);

  const {t} = useTranslate();

  const handleOnclick =()=>{
    navigate('/login');
  }

  return (
    <PageLayout>
      <LoginNav title={t('login.enter')} onClick={handleOnclick}/>
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
