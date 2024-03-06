import React from "react";
import {plural,priceFormat} from "../../utils";
import './style.css'
function ProductsBasket({total, children}){
    const price=total.price;
    const count=total.countProduct;
  
    return <div className='ProductsBasket'>
        <div>В корзине: {count?<b>{count} {plural(count,{
            one:'товар',
            few:'товара',
            many:'товаров'
        })} / {priceFormat(price)+ ' ₽'}</b>:<b>пусто</b>}</div> 
         {children}
    </div>
}
export default ProductsBasket;