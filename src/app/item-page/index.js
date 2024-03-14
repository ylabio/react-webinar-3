import React, {memo, useCallback, useEffect, useState} from 'react';
import './style.css';
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";
import Product from "../../components/product";
import Menu from "../../components/menu";

function ItemPage() {
  const store = useStore();
  const {itemId} = useParams();

  useEffect(() => {
    if (itemId) {
      store.actions.catalog.loadItem(itemId);
    }
  }, [itemId]);

  const select = useSelector(state => ({
    list: state.basket.list,
    item: state.catalog.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Обновляет текущий товар
    uploadCurrentItem: useCallback((idItem) => store.actions.catalog.loadItem(idItem), [store])
  }

  const currentItem = select.item;

  if (!currentItem) {
    return <div>Loading...</div>
  }

  return (
    <PageLayout>
      <Head title={select.item.title}/>
      <Menu onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <Product item={currentItem} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(ItemPage);