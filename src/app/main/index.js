import {memo, useCallback} from 'react';
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
import useSelector from "../../hooks/use-selector";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const token = JSON.parse(localStorage.getItem("XToken"));
  const navigate = useNavigate()
  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.catalog.getCategories();
    if(token) store.actions.login.loginByToken(token);
  }, [], true);

  const {t} = useTranslate();

  const select = useSelector(state => ({
    isLogin: state.login.isLogin,
  }));

  const callbacks = {
    onLogout: useCallback(() => store.actions.login.logout(), [store]),
  }

  const handleOnclick =()=>{
    navigate('/login');
    if(select.isLogin) callbacks.onLogout();
  }

  return (
    <PageLayout>
      <LoginNav onClick={handleOnclick}/>
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
