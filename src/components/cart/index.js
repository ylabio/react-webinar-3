import React from 'react';
import './style.css';
import Head from "../head";
import List from "../list";
import {formatNumber} from "../../utils";
export function Cart({cart, onAction, onClose}) {
  return (
    <>
      <div className={'background'}/>
      <div className={'cart-block'}>
        <div className={'Cart'}>
          <Head title='Корзина'>
            <button className={'button_pointer'} onClick={onClose}>Закрыть</button>
          </Head>
          {cart.totalQuantity > 0 ?
            <div className={'list-block'}>
              <List onAction={onAction} list={cart.list}/>
              <div className={'total-block'}>
                <span>Итого</span>
                <span className={'total-value'}>{formatNumber(cart.sum)} &#8381;</span>
              </div>
            </div>
            : <p className={'info-empty'}>Корзина пуста</p>}
        </div>
      </div>
    </>
  );
}