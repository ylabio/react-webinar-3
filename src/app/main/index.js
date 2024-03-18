import {memo} from 'react';
import useStore from "../../hooks/use-store";
import { Link } from 'react-router-dom';
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import ButtonLogin from '../../components/button-login';
import ButtonOut from '../../components/button-out';


/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const select = useSelector((state) => ({
    user: state.auth.user,
  }));
  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
    {select.user ? (
        <>
          <ButtonOut title="Выход" user={select.user} profilePath={"/profile-page"}/>
        </>
      ) : (
        <>
          <ButtonLogin title="Вход" profilePath='/login' />
        </>
      )}
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
