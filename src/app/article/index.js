import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import { getCategoryChain } from '../../utils';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();

    // Параметры из пути /articles/:id
  const params = useParams();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    categories: state.catalog.categories,
  }));

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const categoryChain = useMemo(() => {
    if (!select.article?.category) return [];
    return getCategoryChain(select.article.category._id, select.categories);
  }, [select.article?.category, select.categories]);

  const breadcrumbs = useMemo(() => {
    const items = [{ key: 'shop', title: t('title'), link: '/' }];
    
    categoryChain.forEach(category => {
      items.push({
        key: category._id,
        title: category.title,
        link: `/?category=${category._id}`
      });
    });
    
    if (select.article) {
      items.push({
        key: select.article._id,
        title: select.article.title,
      });
    }
    
    return items;
  }, [categoryChain, select.article, t]);

  const browserTitle = useMemo(() => {
    const parts = [t('title')];
    
    if (categoryChain.length > 0) {
      parts.push(categoryChain[categoryChain.length - 1].title);
    }
    
    if (select.article) {
      parts.push(select.article.title);
    }
    
    return parts.join(' / ');
  }, [categoryChain, select.article, t]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  return (
    <>
      <Head title={t('title')} browserTitle={browserTitle} breadcrumbs={breadcrumbs}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Article);
