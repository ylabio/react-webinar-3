import React from "react";
import {plural} from "../../utils";
import './style.css'
function ProductsBasket({onGetTotalAmount,onGetTotalCount, children}){

    return <div className='ProductsBasket'>
        <div>В корзине: {onGetTotalCount()?<b>{onGetTotalCount()} {plural(onGetTotalCount(),{
            one:'товар',
            few:'товара',
            many:'товаров'
        })} / {onGetTotalAmount()+ ' ₽'}</b>:<b>пусто</b>}</div> 
         {children}
    </div>
}
export default ProductsBasket;