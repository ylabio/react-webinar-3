import React, {memo, useCallback, useMemo, useState} from "react";
import './style.css';
import Head from "../../components/head";
import Description from "../../components/description";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import BasketTool from "../../components/basket-tool";
import Controls from "../../components/controls";
import {
    Outlet,
    Link,
    useParams,
  } from "react-router-dom";
import { url } from "../../url";
const Product=()=>{
    const [result,setResult]=useState()
    const {productId} = useParams();
    const store = useStore();
    useMemo(()=>{
     store.actions.catalog.getProductLoad(productId).then(res=>setResult(res.result))   
    },[])
  
    const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum
      }));
      const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(() => store.actions.basket.addToBasket(productId), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
       
      }
    
    return <div className="Product">
    <Head title={result?.title}/>
    <BasketTool url={url.basket} onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
    <Description props={result}/>
    <Controls onAdd={callbacks.addToBasket}/>
    <Outlet/>
    </div>
}

export default memo(Product);