import { memo, useEffect } from 'react';
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

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const { t } = useTranslate();
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.categories.load();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categories: state.categories.list,
  }));

  // Находим активную категорию и ставим ее в заголовок
  let searchCategoryTitle;
  select.categories.forEach(item => {
    if (item._id === select.category) {
      searchCategoryTitle = item.title;
    }
  });

  const category = searchCategoryTitle ? `${t('title')}/${searchCategoryTitle}` : t('title');

  // Костыль для замены тайтла во вкладке браузера
  useEffect(() => {
    document.title = category;

    return () => (document.title = 'Simple SPA');
  });

  return (
    <>
      <Head title={category}> 
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
