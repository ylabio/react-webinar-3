import { memo, useEffect, useState } from 'react';
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
  const { t } = useTranslate();
  const store = useStore();

  const [title, setTitle] = useState(t('title'));

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    categoryList: state.categories.list,
    category: state.catalog.params.category,
    waiting: state.catalog.waiting,
  }));

  useEffect(() => {
    if (select.category && !select.waiting) {
      const titlePostFix = select.categoryList.find(
        category => select.category === category._id,
      )?.title;
      if (titlePostFix) {
        setTitle('Магазин / ' + titlePostFix);
        document.title = 'Магазин / ' + titlePostFix;
      }
    } else {
      setTitle('Магазин');
      document.title = 'Магазин';
    }
  }, [select.category, select.categoryList, select.waiting]);

  return (
    <>
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
