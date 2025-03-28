import React from 'react';
import './style.css';
import CartList from '../cart-list';

const CartModal = ({cartList, onClose, onDeleteItem, totalPrice }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Корзина</h2>
        <CartList
          list={cartList}
          onDeleteItem={onDeleteItem}
        />
        <h3 className={"total-price"}>Итого:  {totalPrice} ₽</h3>
      </div>
    </div>
  );
};

export default CartModal;
