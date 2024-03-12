import React, {useCallback, useEffect, useContext} from "react";
import {LanguagesContext} from "../../lang/context";
import {useParams} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemDetails from "../../components/item-details";
import Loader from "../../components/loader";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Details() {
  const store = useStore();
  const {id} = useParams();
  const {langData} = useContext(LanguagesContext);

  const select = useSelector(state => ({
    result: state.details.result,
    isLoading: state.details.isLoading,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.actions.details.setIsLoading(select.isLoading);
    store.actions.details.loadDetails(id);
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(item => store.actions.basket.addToBasket(item), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }
  
  return (
    <PageLayout>
      <Head title={select.result.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} langData={langData}/>
      <Loader isLoading={select.isLoading}>
        <ItemDetails result={select.result} addToBasket={callbacks.addToBasket} langData={langData}/>
      </Loader>
    </PageLayout>
  )
}

export default React.memo(Details);
