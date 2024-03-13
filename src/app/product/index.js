import React, {memo, useCallback, useMemo, useEffect} from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import ProductProperties from "../../components/product-properties";
import Basket from "../basket";

import { Await, defer, useLoaderData } from 'react-router-dom';

function Product() {

  const data = useLoaderData();

  const store = useStore();

  const select = useSelector((state) => ({
    product: state.basket.product,
    _id: state.basket.product._id,
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    vLang: state.lingua.vLang,
  }));

  //useMemo(() => select,[select]);

  useEffect (() => {
      if (select.product._id != data._id)
        store.actions.basket.loadProductToAsyncById(data._id);
  },[store,data,select]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id,1), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => {
      document.body.style.overflow = "hidden";
      store.actions.modals.open('basket');
    }, [store]),
    refreshDataProduct: useCallback((_id) => {
      //store.actions.basket.loadProductToAsyncById(_id);
    }, [store,data]),
  }

  const activeModal = useSelector((state) => {return(state.modals.name)});

  return (
    <>
    {(store.actions.lingua.getState().Language == 'null' ? store.actions.lingua.setVariable('ru-RU') : '')}
    {select.vLang != null && select.product._id != '0' &&
    <main>
    <PageLayout>
          <ProductProperties product={select.product}
                             onOpen={callbacks.openModalBasket}
                             amount={select.amount}
                             sum={select.sum}
                             main={select.vLang.variablesLanguage.BasketTool.main}
                             label={select.vLang.variablesLanguage.BasketTool.label}
                             buttonBasket={select.vLang.variablesLanguage.BasketTool.buttonBasket}
                             one={select.vLang.variablesLanguage.BasketTool.product.one}
                             few={select.vLang.variablesLanguage.BasketTool.product.few}
                             many={select.vLang.variablesLanguage.BasketTool.product.many}
                             empty={select.vLang.variablesLanguage.BasketTool.empty}
                             addToBasket={callbacks.addToBasket}
                             madeIn={select.vLang.variablesLanguage.Page2.madeIn}
                             category={select.vLang.variablesLanguage.Page2.category}
                             edition={select.vLang.variablesLanguage.Page2.edition}
                             price={select.vLang.variablesLanguage.Page2.price}
                             buttonAddProduct={select.vLang.variablesLanguage.buttonAddProduct}/>
    </PageLayout>
    </main>
    }
    {(activeModal === 'basket' && <Basket refreshDataProduct={callbacks.refreshDataProduct}/>)}
    </>
  );
}

export default memo(Product);

export const ProductLoader = async ({params}) => {
  return defer({ _id: params._id });
};