import { memo, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { getCategoryChain } from '../../utils';


/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const { t } = useTranslate();
  const [searchParams] = useSearchParams();

  const select = useSelector(state => ({
    category: state.catalog.params.category,
    categories: state.catalog.categories,
    params: state.catalog.params,
  }));

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam !== select.params.category) {
      store.actions.catalog.setParams({ 
        ...select.params,
        category: categoryParam || '',
        page: 1
      }, true);
    }
  }, [searchParams.get('category')]);

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const categoryChain = useMemo(() => {
    return getCategoryChain(select.category, select.categories);
  }, [select.category, select.categories]);

  const breadcrumbs = useMemo(() => {
    const items = [{ key: 'shop', title: t('title'), link: '/' }];

    categoryChain.forEach((category, index) => {
      items.push({
        key: category._id,
        title: category.title,
        link: index === categoryChain.length - 1 ? null : `/?category=${category._id}`
      });
    });
    
    return items;
  }, [categoryChain, t]);

  const browserTitle = useMemo(() => {
    const parts = [t('title')];
    if (categoryChain.length > 0) {
      parts.push(categoryChain[categoryChain.length - 1].title);
    }
    return parts.join(' / ');
  }, [categoryChain, t]);

  return (
    <>
      <Head browserTitle={browserTitle} title={t('title')} breadcrumbs={breadcrumbs}>
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
