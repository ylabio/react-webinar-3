import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import ItemCart from '../itemCart';
import { NumericFormat } from 'react-number-format';
import { summary } from '../../utils';



function Cart({cart, onDelete}) {


  return (
    <div className="Cart">

    <div className="Cart-head">
     <h2>Корзина</h2>
    </div>

       <ul className="List">
            {cart.map(item => (
              <li key={item.code} className="List-item">
                <ItemCart item={item} onDelete={onDelete}/>
              </li>
            ))}
          </ul>

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
