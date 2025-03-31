import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import List from '../list';
import { NumericFormat } from 'react-number-format';




function Cart({store, onDelete}) {

  const cartSummary = store.getCartSummary();
  const { cart } = store.getState();

  return (
    <div className="Cart">

    <div className="Cart-head">
     <h2>Корзина</h2>
    </div>
           <List
                  cart={cart}
                  onDelete={onDelete}
                />

    <div className="Cart-footer">
      <div className="Cart-summary">
      <div>Итого:</div>
      <div>
                      <NumericFormat value={cartSummary}
              displayType={'text'}
              thousandSeparator=" "
              suffix={' ₽'} />
      </div>

    </div>
    </div>
    </div>
  )
}

Cart.propTypes = {

  onDelete: PropTypes.func,
  cartSummary: PropTypes.func,

};
export default Cart;
