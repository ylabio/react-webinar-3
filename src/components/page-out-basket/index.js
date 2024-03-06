import React, { useRef } from "react";
import Head from "../head";
import List from "../list";
import Controls from "../controls";
import PropTypes from "prop-types";
import './style.css'
import {cn as bem} from '@bem-react/classname';
import { priceFormat } from "../../utils";

function PageOutBasket({list, setBasketOpen, onDeleteBasketItem}) {

  const cn = bem('PageOutBasket');
  const ref=useRef()
const closeBasketBack=(e)=>{
    if(e.target==ref.current){
       setBasketOpen(false)  
    }
    
}
console.log(list)
const price=list.total.price;
  return (
    <div onClick={(e)=>closeBasketBack(e)} ref={ref} className={cn()}>
      <div className={cn('center')}>
      <Head title='Корзина'><Controls name='Закрыть' onButton={()=>setBasketOpen(false)}/></Head>
      <div className={cn()+'List'}>
         <List list={list.list} onDeleteBasketItem={onDeleteBasketItem} />
      
        {price?
            <div className={cn('total')}><b>Итого:</b><b>{priceFormat(price)} ₽</b></div>:
            <div className={cn('total')}><b>Товары в корзине отсутствуют</b></div>
        }
      </div>
     
        
      </div>
    </div>
  );
}

PageOutBasket.propTypes = {
  children: PropTypes.node,
  onGetTotalAmount: PropTypes.func,
  setBasketOpen:PropTypes.func,
}

export default React.memo(PageOutBasket);