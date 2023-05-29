import {memo, useCallback, useEffect, useState} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import CardInfo from '../../components/card-info';
import { useParams } from "react-router-dom"
import Navigate from '../../components/navigate';

function Card() {
  const { id } = useParams()

  useEffect(() => {
    store.actions.catalog.openPage(id);
  }, []);

  const store = useStore();

  const select = useSelector(state => ({
    product: state.catalog.product,
    flag: state.catalog.flag,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (  
    <PageLayout>
      <Head title={select.flag? select.product.title : ''}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}>
        <Navigate />
      </BasketTool>
      <CardInfo product={select.product} flag={select.flag} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(Card);