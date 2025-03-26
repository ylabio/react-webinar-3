import React from 'react';
import List from '../list';
import ModalWindow from '../modal';
import PropTypes from 'prop-types';
import './style.css';

function Cart({
  isVisible = false,
  setVisible = () => {},
  cartList = [],
  onRemoveFromCart = () => {}
}) {
  const total = cartList.reduce((acc, item) => acc + (item.amount * item.price), 0)
  
  return (
    <ModalWindow isVisible={isVisible} setVisible={setVisible}>
      <div className="Cart">
        <h1>Корзина</h1>
        <List
          list={cartList}
          callback={onRemoveFromCart}
          isCartItem={true}
        />
        <div className="Item-title-description Cart-total">
          <div><b>Итого:</b></div>
          <div><b>
            {`${total} ₽`}
            </b>
          </div>
        </div>
        
      </div>
      
    </ModalWindow>
  )
}

Cart.propTypes = {
  isModalVisible: PropTypes.bool,
  setVisible: PropTypes.func,
  cartList: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
      }),
    ),
  onRemoveFromCart: PropTypes.func
}

export default Cart;
