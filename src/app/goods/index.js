import {memo, useCallback, useEffect} from 'react';
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Details from "../../components/details";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Goods() {

  const { id } = useParams();

  const store = useStore();

  const select = useSelector(state => ({
    detail: state.catalog.detail,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.actions.catalog.detail(id);
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.detail.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <Details detail={select.detail} onAdd={callbacks.addToBasket}/>
    </PageLayout>
  );
}

export default memo(Goods);
