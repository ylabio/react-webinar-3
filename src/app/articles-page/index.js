import { memo, useCallback, useLayoutEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import ItemDetails from '../../components/item-details';

function ArticlesPage() {
  const store = useStore();
  const { articleId } = useParams();

  useLayoutEffect(() => {
    store.actions.articles.getProductDetails(articleId);
  }, []);

  const basket = useSelector(({ basket }) => ({
    amount: basket.amount,
    sum: basket.sum,
  }));

  const articles = useSelector(({ articles }) => ({
    ...articles.data,
    loading: articles.loading,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      _id => store.actions.basket.addToBasket(_id),
      [store],
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store],
    ),
  };
  console.log(articles.loading);
  return (
    <PageLayout>
      {articles.loading === 'success' && (
        <>
          <Head title={articles.title} />
          <p>{}</p>
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={basket.amount}
            sum={basket.sum}
          />
          <ItemDetails item={articles} onAdd={callbacks.addToBasket} />
        </>
      )}
    </PageLayout>
  );
}

export default memo(ArticlesPage);
