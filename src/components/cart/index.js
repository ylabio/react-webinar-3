import React from "react";
import './style.css';
import PropTypes from 'prop-types';
import Item from "../item";
import List from "../list";

function Cart({ onClose, cartItems, totalPrice, store }){

  return (

      <div className='Cart'>
        <div className='Cart-header'>
          <h2 className='Cart-title'>Корзина</h2>
          <button className='Cart-button' onClick={() => onClose()}>Закрыть</button>
        </div>

        {cartItems.length !== 0 ?

          <List list={cartItems}
                cartItems={cartItems}
                store={store}
                showDeleteButton={true}
                showCount={true} />
          :
          <p className={'Cart-message'}>В корзине нет товаров</p>
        }

        <div className='Cart-price'>
          <p>Итого</p>
          {`${totalPrice.toLocaleString()} ₽`}
        </div>
      </div>

  )
}

Cart.propTypes = {
  onClose: PropTypes.func,
  cartItems: PropTypes.array,
  setCartItems: PropTypes.func,
  totalPrice: PropTypes.number
};

Cart.defaultProps = {
  onClose: () => {},
  cartItems: [],
  setCartItems: () => {},
  totalPrice: 0
};

export default Cart;
