import React, {useCallback, useEffect} from "react";
import {useParams} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemDetails from "../../components/item-details";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Details() {
  const store = useStore();
  const {id} = useParams();

  useEffect(() => {
    store.actions.details.loadDetails(id);
  }, [id]);

  const select = useSelector(state => ({
    result: state.details.result,
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
      <Head title={select.result.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ItemDetails result={select.result} addToBasket={callbacks.addToBasket}/>
    </PageLayout>
  )
}

export default React.memo(Details);
