import { useCallback, useLayoutEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import ItemDetails from '../../components/item-details';
import ErrorText from '../../components/error-text';

function ArticlesPage() {
  const store = useStore();
  const { articleId } = useParams();

  useLayoutEffect(() => {
    store.actions.articles.getProductDetails(articleId);
  }, [articleId]);

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

  return (
    <PageLayout>
      <Head title={articles.title} />
      <p>{}</p>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={basket.amount}
        sum={basket.sum}
      />
      {articles.loading === 'success' && (
        <ItemDetails item={articles} onAdd={callbacks.addToBasket} />
      )}
      {articles.loading === 'failed' && (
        <ErrorText>Не удалось загрузить товар</ErrorText>
      )}
    </PageLayout>
  );
}

export default ArticlesPage;
