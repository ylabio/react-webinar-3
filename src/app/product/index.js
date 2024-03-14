import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductForm from "../../components/product-form";
import PageLayout from "../../components/page-layout";
import PageMenu from "../../components/page-menu";
import PageHeader from "../../components/page-header";
import ProductFormLoader from "../../components/product-form-loader";

const Product = () => {
  const {id} = useParams()

  const store = useStore()

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.lang,
    item: state.product.item,
    isLoading: state.product.loading
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changeLang: useCallback((lang) => store.actions.lang.changeLang(lang), [store]),
    getItem: useCallback((_id) => store.actions.product.getItem(_id), [store])
  }

  useEffect(() => {
    callbacks.getItem(id)
  }, [id])

  return (
    <PageLayout>
      <PageHeader
        title={select.item?.title}
        lang={select.lang}
        changeLang={callbacks.changeLang}
        inProductPage
      />
      <PageMenu
        openModal={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        lang={select.lang}
      />
      <ProductFormLoader isLoading={select.isLoading} lang={select.lang}>
        <ProductForm
          item={select.item}
          lang={select.lang}
          openModal={callbacks.openModalBasket}
          addToBasket={callbacks.addToBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </ProductFormLoader>
    </PageLayout>
  );
};

export default React.memo(Product);
