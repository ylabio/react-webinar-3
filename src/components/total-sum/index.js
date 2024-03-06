import React from "react";
import './style.css'
import { priceFormat } from "../../utils";
const TotalSum=({price})=>{


    return(
        <div>
            {price?
            <div className='TotalSum'><b>Итого </b><b> {priceFormat(price)} ₽</b></div>:
            <div className='TotalSum'><b>Товары в корзине отсутствуют</b></div>}
        </div>
    )
}

export default TotalSum;