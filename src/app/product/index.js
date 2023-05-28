import React, { useEffect, useCallback, memo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ItemProduct from '../../components/item-product';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import { useParams } from 'react-router-dom';
import useSelector from '../../store/use-selector';


const Product = () => {
  const store = useStore();
  const { id } = useParams();

  const callback = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const good = useSelector(state => ({
    item: state.catalogItem.catalogItem,
    category: state.catalogItem.category,
    madeIn: state.catalogItem.madeIn,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  useEffect(() => {
    store.actions.catalogItem.load(id);
  }, [id]);

  return (
    <PageLayout>
      <Head title={good.item.title} />
      <BasketTool onOpen={callback.openModalBasket} amount={good.amount}  sum={good.sum} />
      <ItemProduct item={good.item} category={good.category} madeIn={good.madeIn} onAdd={callback.addToBasket} />
    </PageLayout>
  );
};

export default memo(Product);