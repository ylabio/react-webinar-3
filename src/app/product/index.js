import React, {memo, useCallback, useMemo, useState} from "react";
import Description from "../../components/description";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import Controls from "../../components/controls";
import {api} from '../../api'
import {
    useParams,
  } from "react-router-dom";
import { url } from "../../url";
import Menu from "../../components/main-menu";
import ModalProduct from "../../components/modal-product";
const Product=()=>{
    const [result,setResult]=useState()
    const {productId} = useParams();
    const store = useStore();
    useMemo(()=>{
     api.getProductPriceApi(productId).then(res=>setResult(res.result))   
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
    
    return <>
      <ModalProduct>
   <Menu title={result?.title} url={url.basket} onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
    <Description props={result}/>
    <Controls onAdd={callbacks.addToBasket}/>
      </ModalProduct>
 
    
    </>
}

export default memo(Product);