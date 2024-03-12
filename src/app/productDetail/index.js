import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Basket from "../basket";
import "./style.css";
import PageLayout from "../../components/page-layout";
import { numberFormat, plural } from "../../utils";
import Controls from "../../components/controls";

function ProductDetail() {
  const { id } = useParams();
  const store = useStore();

  console.log(store);
  const select = useSelector((state) => ({
    result: state.pageDetails.result,
    activeModal: state.modals.name,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    
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
    <PageLayout>
      <>
        <div>
          <Head title={select.result.title} />
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
          />
          {/*JSON.stringify(select.result)*/}
          <div className="div_detail">{select.result.description}</div>
          <p className="div_detail"> Страна производитель:
            <span> <b> {select.result.madeIn?.title}</b> </span>
            <span> <b> ({select.result.madeIn?.code}) </b> </span>
          </p>
          <p className="div_detail">Категория: <span ><b>{select.result.category?.title}</b></span></p>
          <p className="div_detail">Год выпуска: <span ><b>{select.result.edition}</b></span></p>
          <div className="div_detail"><b>Цена: {select.result.price} ₽</b></div>
        <Controls onAdd={callbacks.addToBasket}/>
        </div>
        {select.activeModal === "basket" && <Basket />}
      </>
    </PageLayout>
  );
}

export default ProductDetail;
