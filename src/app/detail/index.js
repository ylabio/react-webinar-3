import {memo, useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import DetailCard from '../../components/detail-card';

function Detail(){
  const store = useStore();
  const {id} = useParams();

  useEffect(() => {
    store.actions.detail.loadById(id);
  }, [id]);

  const select = useSelector(state => ({
    detail: state.detail.detail,
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
      <Head title={select.detail.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <DetailCard detail={select.detail} onAdd={callbacks.addToBasket}/>
    </PageLayout>
  )
}

export default memo(Detail);
