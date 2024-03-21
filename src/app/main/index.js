import { memo } from 'react';
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useInit from "../../hooks/use-init";
import useSelector from '../../hooks/use-selector';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import AuthControl from '../../components/auth-control';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);



  return (
      <>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
      </>
  );
}

export default memo(Main);
