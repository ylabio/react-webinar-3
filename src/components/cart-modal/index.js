import React from 'react';
import {cartTotalSum} from '../../utils';
import List from '../list';
import CartItem from '../cart-item';
import PropTypes from 'prop-types';

import './style.css';

function CartModal({cart, onClearItem, onCloseCart}) {
  const render = (item) => {
    return <CartItem onClearItem={onClearItem} item={item} />;
  };

  return (
    <div className="Cart">
      <div className="Cart-head">
        <h2>Корзина</h2>
        <button onClick={onCloseCart}>Закрыть</button>
      </div>
      <List list={cart} render={render} />
      <div className="Cart-total">
        <div className="Cart-total-title">
          <span className="bold">Итого</span>
        </div>
        <div className="Cart-total-sum">
          <span className="bold">{`${cartTotalSum(cart)}₽`}</span>
        </div>
      </div>
    </div>
  );
}

CartModal.PropTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      price: PropTypes.number,
      title: PropTypes.string,
      quantity: PropTypes.number,
    })
  ).isRequired,
  onClearCart: PropTypes.func.isRequired,
  onCloseCart: PropTypes.func.isRequired,
};

CartModal.defaultProps = {
  onClearItem: () => {},
  onCloseCart: () => {},
};

export default React.memo(CartModal);
