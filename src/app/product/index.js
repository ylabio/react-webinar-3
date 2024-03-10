import React, { memo, useCallback, useEffect } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router-dom';
import ProductCart from '../../components/product-cart';

function Product() {
  const store = useStore();
  const { id } = useParams();

  useEffect(() => {
    store.actions.catalog.loadById(id);
  }, [id, store.actions.catalog]);

  const select = useSelector(state => ({
    product: state.catalog.product,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.product?.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ProductCart product={select?.product} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(Product);
