import React from "react";
import './style.css';
import {plural} from "../../utils";

function Controls({setIsActive, cartList}) {

  const summPrice = cartList.reduce((acc, item) => {
    acc += item.price*item.amountCart;
    return acc;
  }, 0);
  return (
    <div className='Controls'>
      <a>В корзине:</a>
      <strong>{cartList.length != 0 ? ` ${cartList.length} ${plural(cartList.length, {
        one: ' товар',
        few: ' товара',
        many: ' товаров'
      })} / ${summPrice} ₽` : `пусто`}</strong>
      <div className='Controls-button'><button onClick={() => setIsActive(true)}>Перейти</button></div>
      {/* onClick={() => props.onAdd()} */}
    </div>
  )
}



Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
