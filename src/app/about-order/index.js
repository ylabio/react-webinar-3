import React, {useCallback, useEffect} from 'react'
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import Description from '../../components/order-description';
import Item from '../../components/item';
import {useParams} from 'react-router-dom';


function AboutOrder() {
  const store = useStore();

  const select = useSelector(state => ({
    madeIn: state.order.madeIn,
    category: state.order.category,
    madeInCode: state.order.madeInCode,
    description: state.order.description,
    year: state.order.year,
    price: state.order.price,
    title: state.order.title,
  }));


  const { id } = useParams();
  console.log(select.madeIn)

  useEffect(() => {
    store.actions.order.loadOrderInfo(id);
  }, [store]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // loadOrderInfo: useCallback(() => store.actions.order.loadOrderInfo(id), [store])

  }

  

  // const callbacks = {
  //   item: useCallback((item) => {
  //     return <Item item={item} onAdd={callbacks.addToBasket}/>
  //   }, [callbacks.addToBasket]),
  // }

  // const renders = {
  //   itemBasket: useCallback((item) => {
  //     return <ItemBasket item={item} onRemove={callbacks.removeFromBasket}/>
  //   }, [callbacks.removeFromBasket]),
  // };


  return (
      <PageLayout>
      <Head title={select.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <Description addToBasket={callbacks.addToBasket}
                    madeIn={select.madeIn}
                    category={select.category}
                    madeInCode={select.madeInCode}
                    description={select.description}
                    year={select.year}
                    price={select.price}
                    id = {id}
      />
    </PageLayout>
 
  )
}

export default React.memo(AboutOrder);