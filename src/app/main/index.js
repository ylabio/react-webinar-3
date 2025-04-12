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
import { useNavigate } from 'react-router-dom';
import AuthField from '../../components/auth-field';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const user = useSelector(state => state.user);

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.user.loadProfile();
    },
    [],
    true,
  );

  const navigate = useNavigate();
  const handleLogout = async () => {
    await store.actions.user.logout();
    navigate('/');
  };

  const { t } = useTranslate();

  return (
    <>
      <Head title={t('title')} authField={<AuthField user={user} callback={handleLogout} />}>
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
