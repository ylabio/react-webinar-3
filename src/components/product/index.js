import {memo, useCallback} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import {useRouteLoaderData} from "react-router-dom";
import ProductInfo from "../product-info";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Product() {
  const data = useRouteLoaderData("product");
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    info: useCallback((item) => {
      return <ProductInfo item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={data.result.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {renders.info(data.result)}
    </PageLayout>

  );
}

export default memo(Product);
