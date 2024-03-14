import React, { memo, useCallback } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import MenuLayout from "../../components/menu-layout";
import Nav from "../../components/nav";
import BasketTool from "../../components/basket-tool";
import ProductDescription from "../../components/product-description";

const ProductPage = () => {
  const store = useStore();

  const select = useSelector((state) => ({
    product: state.product.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
    valueLang: state.language.valueLang,
  }));

  const callbacks = {
    addToBasket: useCallback(
      (id) => store.actions.basket.addToBasket(id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    // Смена языка
    onChangeLang: useCallback(()=> store.actions.language.changeLang()),
  };

  return (
    <PageLayout>
      <Head
        title={select.product ? select.product?.title : "Товар не выбран"}
        onChangeLang={callbacks.onChangeLang}
        valueLang={select.valueLang} 
      />
      <MenuLayout>
        <Nav textLink={ select.valueLang ? "Главная" : "Main" } />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          valueLang={select.valueLang} 
        />
      </MenuLayout>
      {select.product && (
        <ProductDescription
          product={select.product}
          onAdd={callbacks.addToBasket}
          valueLang={select.valueLang} 
        />
      )}
    </PageLayout>
  );
};

export default memo(ProductPage);
