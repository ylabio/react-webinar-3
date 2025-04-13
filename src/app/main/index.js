import { memo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import AuthButton from '../../components/auth-button';
import SideLayout from '../../components/side-layout';
import UserInfo from '../../containers/user-info';
import UserInfoLayout from '../../components/user-info-layout';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const [headerTitle, setHeaderTitle] = useState('Магазин');
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  return (
    <>
      <UserInfoLayout>
        <UserInfo />
      </UserInfoLayout>

      <Head title={headerTitle}>
        <LocaleSelect />
      </Head>

      <PageLayout>
        <Navigation />
        <CatalogFilter setHeaderTitle={setHeaderTitle} />
        <CatalogList />
      </PageLayout>
    </>
  );
}

export default memo(Main);
