import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import CartItem from '../cart-item';
import './style.css';

function ModalCart({ cart, onDelete }) {
  if (cart.length < 1) {
    return <div className='Modal-Empty'>Корзина пуста</div>;
  }

  return (
    <div className='Modal-Cart'>
      <List list={cart.items} renderItem={(item) => (
        <CartItem item={item} onBtnClick={onDelete} key={item.code}/>
      )}/>
      <span className='Modal-Total'>
        Итого <span className='Modal-Price'>{cart.totalPrice.toLocaleString()}&nbsp;₽</span>
      </span>
    </div>
  );
}

ModalCart.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      amount: PropTypes.number,
    })),
    totalPrice: PropTypes.number,
    length: PropTypes.number
  }),
  onDelete: PropTypes.func
}

export default ModalCart;
