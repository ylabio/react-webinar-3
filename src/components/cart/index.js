import React from "react";
import './style.css';
import Head from "../head/index";
import Button from "../button/index"
import List from "../list/index";

function Cart({list, callbacks, buttonTitle, totalSumm}){
  return (
    <div className="cart">
      <div className="cart-title-row">
        <Head title='Корзина'/>
        <Button callback={callbacks.onCloseCart}  title={'Закрыть'}/>
      </div>

      <List list={list}
            callback={callbacks.onRemoveFromCart}
            buttonTitle={buttonTitle}
            />
      <div className="cart-totalSumm">
        <div>
          <p>Итого</p>
        </div>
      <div>{`${totalSumm} ₽`}</div>
    </div>
    </div>
  )
}

export default Cart;