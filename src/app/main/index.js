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
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );
  const select = useSelector(state => ({
    categories: state.categories,
    category: state.catalog.params.category,
  }));

  const currentCategory = store.actions.categories.getCategoryByValue(select.category)?.title || null;

  const { t } = useTranslate();

  const titleText = currentCategory ? `${t('title')} / ${currentCategory}` : t('title');

  document.title = titleText;

  return (
    <>
      <Head title={titleText}>
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
