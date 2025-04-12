import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import LoginButton from '../../components/login-button';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const { t } = useTranslate();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categories: state.catalog.categories,
  }));

  const currentCategory = select.categories.find(cat => cat._id === select.category);
  const title = currentCategory ? `${t('title')} / ${currentCategory.title}` : t('title');
  document.title = title;

  return (
    <>
      <LoginButton />
      <Head title={title}>
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
