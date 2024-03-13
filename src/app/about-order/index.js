import React, {useCallback, useEffect, useState} from 'react'
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Description from '../../components/order-description';
import {useParams} from 'react-router-dom';
import Panel from '../../components/panel';


function AboutOrder() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.translation.lang,
    description: state.order.description,
  }));

  const { id } = useParams();

  useEffect(() => {
    store.actions.order.loadOrderInfo(id);
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    switchLang: useCallback(() => store.actions.translation.switchLang(), [select.lang]),
  }

  const [currentPage, setCurrentPage] = useState(1);
  // Изменить страницу
  const paginate = pageNumber => setTimeout(() => {setCurrentPage(pageNumber)}, 500)

  return (
      <PageLayout>
      <Head title={select.description} switchLang={callbacks.switchLang} lang={select.lang}/>
      <Panel onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang} paginate={paginate}/>
      <Description addToBasket={callbacks.addToBasket}
                    lang={select.lang}
                    orderDescription={select.description}
      />
    </PageLayout>
 
  )
}

export default React.memo(AboutOrder);