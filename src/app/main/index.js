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
import Auth from '../../components/auth';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    userName: state.user.userName,
  }));

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Auth userName={select.userName}/>
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
