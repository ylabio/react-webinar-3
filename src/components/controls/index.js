import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { useBasket } from "../basketContext";
import { plural } from "../../utils";

function Controls({basketList}) {
  const {onBasketVisible} = useBasket();
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);
    
    useMemo(()=>{
        setCount(basketList.length);
        setSum(basketList.reduce((acc,curr) => acc + (curr.price*curr.count),0));
    },[basketList])

    const countPlural = `${count} ${plural(count,
      {one: 'товар',
       few: 'товара',
       many: 'товаров'})}`
  
  return (
    <div className='Controls'>
      {basketList.length !=0 ?
      <div className="basket-info">В корзине: <span> {countPlural} / {sum} ₽</span></div>
      :
      <div className="basket-info">В корзине: <span> пусто</span></div>
      }
      
      <button className="Controls-btn" onClick={() => {onBasketVisible()}}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onBasketVisible: PropTypes.func
};

Controls.defaultProps = {
  onBasketVisible: () => {}
}

export default React.memo(Controls);
