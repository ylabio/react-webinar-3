import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {getRoutePath} from "../../router/config";
import {AppRouter} from "../../router";
import {useLocation} from "react-router-dom";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    headTitle: state.application.headTitle,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    loadCatalogPage: useCallback((page) => store.actions.catalog.load(page), [store]),
    getRoutePath: useCallback((...args) => getRoutePath(...args), [])
  }

  return (
    <PageLayout>
      <Head title={select.headTitle}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} getRoutePath={callbacks.getRoutePath}/>
      <AppRouter/>
    </PageLayout>
  );
}

export default memo(Main);
