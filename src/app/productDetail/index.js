import React, { useState, useEffect, useCallback,useContext } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Basket from "../basket";
import "./style.css";
import PageLayout from "../../components/page-layout";
import { numberFormat, plural } from "../../utils";
import { LanguagesContext } from "../../components/languageSwitcher";
import DescriptionItem from "../../components/descriptionItem";

function ProductDetail() {
  const {langData} = useContext(LanguagesContext);
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
            langData={langData}
          />
          {/*JSON.stringify(select.result)*/}
          <DescriptionItem  result={select.result} addToBasket={callbacks.addToBasket} langData={langData}/>
       
        </div>
        {select.activeModal === "basket" && <Basket />}
      </>
    </PageLayout>
  );
}

export default ProductDetail;
