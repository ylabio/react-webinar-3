import React, {useCallback, useEffect} from 'react';
import './style.css';
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import PageLayout from "../../components/page-layout";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";
import Product from "../../components/product";

function ItemPage() {
  const store = useStore();
  const {itemId} = useParams();
  console.log(itemId)

  useEffect(() => {
    if (itemId) {
      store.actions.catalog.loadItem(itemId);
    }
  }, [itemId]);

  const select = useSelector(state => ({
    item: state.catalog.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store])
  }

  const currentItem = select.item;

  if (!currentItem) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <Head title={select.item.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <Product item={currentItem} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default ItemPage;