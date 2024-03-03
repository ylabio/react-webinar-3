import React, { useRef } from "react";
import PropTypes from "prop-types";
import './style.css'
import {cn as bem} from '@bem-react/classname';


function PageOutBasket({children,onGetTotalAmount, setBasketOpen}) {

  const cn = bem('PageOutBasket');
  const ref=useRef()
const closeBasketBack=(e)=>{
    if(e.target==ref.current){
       setBasketOpen(false)  
     
    }
}
  return (
    <div onClick={(e)=>closeBasketBack(e)} ref={ref} className={cn()}>
      <div className={cn('center')}>
        {children}
        {onGetTotalAmount()?
            <div className={cn('total')}><b>Итого:</b><b>{onGetTotalAmount()} ₽</b></div>:
            <div className={cn('total')}><b>Товары в корзине отсутствуют</b></div>
        }
        
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