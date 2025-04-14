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
import AuthHeaderContainer from '../../containers/auth-header';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.categories.load();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  const select = useSelector(state => ({
    categoryId: state.catalog.params.category,
    categories: state.categories.list,
  }));

  // Находим текущую выбранную категорию
  const currentCategory = select.categories.find(c => c._id === select.categoryId);

  // Формируем заголовок
  const headTitle = currentCategory
    ? `${t('title')} / ${t(`categories.${currentCategory.title}`)}`
    : t('title');

  // Обновляем title страницы при изменении категории
  useEffect(() => {
    document.title = headTitle;
  }, [headTitle]);

  return (
    <>
      <AuthHeaderContainer />
      <Head title={headTitle}>
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
