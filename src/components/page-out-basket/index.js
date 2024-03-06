import React from "react";
import List from "../list";
import PropTypes from "prop-types";
import './style.css'
import {cn as bem} from '@bem-react/classname';
import { priceFormat } from "../../utils";

function PageOutBasket({list, onDeleteBasketItem}) {
  const cn = bem('PageOutBasket');

let price;
if(Object.keys(list).length === 0){
  price=0
  list.list=[];
} else{
  price=list?.total?.price
}
console.log(list)

  return (
    <div  className={cn()}>
      <div className={cn('center')}>

      <div className={cn()+'List'}>
         <List list={list.list} onDeleteBasketItem={onDeleteBasketItem} />
      
      
      </div>
       {price?
            <div className={cn('total')}><b>Итого:</b><b>{priceFormat(price)} ₽</b></div>:
            <div className={cn('total')}><b>Товары в корзине отсутствуют</b></div>
        }
        
      </div>
    </div>
  );
}

PageOutBasket.propTypes = {
  children: PropTypes.node,
  onGetTotalAmount: PropTypes.func,
}

export default React.memo(PageOutBasket);