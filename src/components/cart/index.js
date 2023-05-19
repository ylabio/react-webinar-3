import React, {useMemo} from 'react';
import Head from "../head";
import './style.css'
import List from "../list";
import {numberFormat} from "../../utils";

function Cart({cartList, onDeleteCartItem, setCartState}) {

  const cartPrice = useMemo(() => {
    return cartList.reduce((sum, item) => sum + item.price*item.count, 0)
  }, [cartList])

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
            deleteCartItem={onDeleteCartItem}
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