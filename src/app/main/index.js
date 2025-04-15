import { useEffect, memo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';

/**
 * Главная страница - первичная загрузка каталога и категорий
 */
function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    categories: state.categories.data,
    category: state.catalog.params.category,
  }));


  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.categories.load();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  // Найдём выбранную категорию по ID
  const currentCategory = select.categories.find(cat => cat._id === select.category);

  // Сформируем название
  const pageTitle = currentCategory ? `${t('title')} / ${currentCategory.title}` : t('title');

  // Установим заголовок браузера
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <>
      <Head title={pageTitle}>
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
