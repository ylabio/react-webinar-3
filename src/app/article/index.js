import React from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import useSelector from '../../store/use-selector';
import BasketTool from '../../components/basket-tool';
import ArticleDetails from '../../components/article-details';
import Controls from '../../components/controls';

const Article = () => {
  const store = useStore();
  const { id } = useParams();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  useEffect(() => {
    store.actions.article.load(id);
    store.actions.modals.close();
  }, [id]);

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.article.item,
  }));
  return (
    <PageLayout>
      <Head title={select.item.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ArticleDetails item={select.item} />
      <Controls
        onAdd={() => {
          callbacks.addToBasket(id);
        }}
      />
    </PageLayout>
  );
};

export default memo(Article);
