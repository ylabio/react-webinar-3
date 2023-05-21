import React from 'react';
import './style.css';
import Head from '../head';
import List from '../list';

function CartModal ({ cartOpen, totalPrice, onDeleteItem, cartItems }) {
  return (
    <>
      <div className="Backdrop" onClick={() => cartOpen(false)}></div>
      <div className="CartModal">
        <Head title="Корзина" modalMargin={true}>
          <button className="CartModal-close" onClick={() => cartOpen(false)}>
            Закрыть
          </button>
        </Head>
        
        <List onDeleteItem={onDeleteItem} cartItems={cartItems} />
        {!cartItems.length ? (
          <strong>В корзине пусто!</strong>
        ) : (
          <div className="CartModal-total">
            <span>Итого</span>
            <span>{totalPrice} ₽</span>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;