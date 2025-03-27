import React from 'react';
import './style.css';
import ItemCart from '../itemCart';
import { NumericFormat } from 'react-number-format';
import { summary } from '../../utils';



function Cart({cart, onDelete}) {


  return (
    <div class="Cart">

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

export default Cart;
