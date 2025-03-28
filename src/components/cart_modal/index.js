// cart_modal.jsx
import React from 'react';
import List from '../list';
import './style.css';
import cancel from "../../assets/cancel.svg";
import cart_empty from '../../assets/cart_empty.png'

function CartModal({ cart, onClose, onDeleteItem }) {
  
  const totalPrice = cart.reduce((acc, item) => {
    const qty = item.quantity || 1;
    return acc + (item.price || 0) * qty;
  }, 0);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Корзина</h2>
          <button className="modal-close" onClick={onClose}><img className='modal-cancel' src={cancel} alt='cancel' /></button>
        </div>

        {cart.length === 0 ? (
        <div className="Cart-empty">
          <img src={cart_empty} />
          <b>В вашей корзине пока пусто</b>
        </div>
        ) : (
        <>
          <List
            list={cart}
            variant="cart"
            onDeleteItem={onDeleteItem}
          />
          <div className='Cart-total'>
            <div className="Cart-total-item">
              <b>Итого:</b>
            </div>

            <div className="Cart-total-item">
              <b>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</b>
            </div>
          </div>
        </>
        )}

      </div>
    </div>
  );
}

export default CartModal;
