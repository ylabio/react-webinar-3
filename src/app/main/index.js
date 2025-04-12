import { memo, useEffect } from 'react';
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

  const { t } = useTranslate();
  const select = useSelector(state => ({
    category: state.catalog.params.category || '',
    categories: state.catalog.categories,
  }));

  // Функция для получения названия категории по value
  const getCategoryTitle = categoryValue => {
    const category = select.categories.find(cat => cat.value === categoryValue);
    return category ? category.title : '';
  };

  // Заголовок страницы в зависимости от категории
  const categoryTitle = select.category ? getCategoryTitle(select.category) : '';
  const pageTitle =
    categoryTitle === '' || categoryTitle === 'Все'
      ? t('store') // "Магазин" в переводе
      : `${t('store')}  ${categoryTitle}`;
  // Обновляем заголовок страницы
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
