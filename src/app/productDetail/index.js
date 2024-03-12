
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Head from "../../components/head";
import BasketTool from '../../components/basket-tool';
import Basket from '../basket';

function ProductDetail() {
  const { id } = useParams();
  const store = useStore();

  console.log(store);
  const select = useSelector((state) => ({
    result: state.pageDetails.result,
    activeModal: state.modals.name,
  }));

  
  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  useEffect(() => {
    store.actions.pageDetails.load(id);
  }, [id]);

  return (
    <>
      <div className='div_detail'>
      <Head title="Магазин" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
      />
      {/*JSON.stringify(select.result)*/}
      <div>{select.result.title}</div>
      <div>{select.result.description}</div>
      </div>
      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}


export default ProductDetail;
