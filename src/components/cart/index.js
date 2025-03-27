import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import List from '../list';
import { NumericFormat } from 'react-number-format';
import { summary } from '../../utils';



function Cart({cart, onDelete}) {


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
                      <NumericFormat value={summary(cart)}
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
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
    })
  ),
  onDelete: PropTypes.func,
};
export default Cart;
