import React, {useCallback} from "react";
import { useAsyncValue } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Head from '../head';
import BasketTool from "../basket-tool";
import { numberFormat } from "../../utils";
import { lang } from "../../data/lang";
import './style.css';

function ItemInfo() {
  const item = useAsyncValue().result;

  const cn = bem('ItemInfo');

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.lang
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    
    addToBasket: useCallback(() => store.actions.basket.addToBasket(item._id, item), [store]),
  }
  
  return (
    <>
      <Head title={item.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <section className={cn()}>
        <p>{item.description}</p>
        <p>{lang[select.lang].country}: <strong>{item.madeIn.title} ({item.madeIn.code})</strong></p>
        <p>{lang[select.lang].category}: <strong>{item.category.title}</strong></p>
        <p>{lang[select.lang].year}: <strong>{item.edition}</strong></p>
        <h1>{lang[select.lang].price}: {numberFormat(item.price)} ₽</h1>
        <button onClick={callbacks.addToBasket}>{lang[select.lang].add}</button>
      </section>
    </>
  )
}

export default React.memo(ItemInfo)