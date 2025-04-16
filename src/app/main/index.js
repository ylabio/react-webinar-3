import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import HeadTop from '../../components/head-top';
import useAuth from '../../hooks/use-auth';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const { token, user, signOut } = useAuth();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.categories.load();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  return (
    <>
      <HeadTop username={user?.username} token={token} signOut={signOut} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <CatalogFilter />
        <CatalogList />
      </PageLayout>
    </>
  );
}

export default memo(Main);
