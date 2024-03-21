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
import TopMenu from '../../containers/top-menu';

/**
 * Главная страница - первичная загрузка каталога
 */
function Profile() {

  const store = useStore();

  useInit(() => {
    store.actions.auth.loginIn()
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <TopMenu/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Profile);
