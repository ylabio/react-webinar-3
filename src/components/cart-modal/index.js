import React from 'react';
import './index.css';
import { plural } from '../../utils';
import { useState } from 'react';
import Head from '../head';
import List from '../list';

const CartModal = ({ cartOpen, fullPrice, onDeleteItem, items }) => {
  return (
    <>
      <div className="Backdrop" onClick={() => cartOpen(false)}></div>
      <div className="CartModal">
        <Head title="Корзина" className="red" modalMargin={true}>
          <button className="CartModal-close" onClick={() => cartOpen(false)}>
            Закрыть
          </button>
        </Head>
        <List title="Удалить" action={onDeleteItem} list={items} />
        {!fullPrice ? (
          <strong>В корзине пусто!</strong>
        ) : (
          <div className="CartModal-total">
            <span>Итого</span>
            <span>{fullPrice} ₽</span>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
