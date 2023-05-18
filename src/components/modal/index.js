import React from "react";
import PropTypes from 'prop-types';
import CartItem from "../cart-item";
import './style.css';

function Modal({cart, isOpen, onClose, onDelete, total}){
  return (
    <div className={`Modal ${isOpen && 'opened'}`}>
      <div className='Modal-content'>
        <div className='Modal-head'>
          <h2>Корзина</h2>
          <button onClick={onClose}>Закрыть</button>
        </div>
        <div className="Modal-body">
          {cart.length > 0 && cart.map((item) => (
            <CartItem key={item.code} item={item} onRemove={() => onDelete(item.code)} isCartItem>{item.title}</CartItem>
          ))}
          {cart.length === 0 && "Корзина пуста"}
        </div>
        <div className="Modal-footer">
          {
            cart.length > 0 && 
              <div className="Modal-total">
                Итого
                <span>{`${total} ₽`}</span>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  cart: PropTypes.array,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  total: PropTypes.number,
};

Modal.defaultProps = {
  cart: [],
  isOpen: false,
  onClose: () => {},
  onDelete: () => {},
  total: 0,
}

export default Modal;
