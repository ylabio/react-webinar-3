import React from 'react';
import Head from "../head";
import './style.css'
import List from "../list";
import {numberFormat} from "../../utils";
import {store} from "../../index";

function Cart({cartList, setCartState}) {

  const cartPrice = store.state.cartPrice

  return (
    <div className='Cart'>
      <div className='Cart-modal'>
        <div className='Cart-head'>
          <Head title='Корзина'>
            <button onClick={() => setCartState(false)}>Закрыть</button>
          </Head>
        </div>
        <div className='Cart-content'>
          <List
            list={cartList}
            actionItem='delete'
          />
        </div>
        <div className='Cart-total'>
          <b>Итого</b>
          <b>{numberFormat(cartPrice)} ₽</b>
        </div>
      </div>
    </div>
  );
};

export default Cart;