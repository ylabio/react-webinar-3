import React, { useState } from 'react';
import Cart from '../cart';
import PageLayout from '../page-layout';
import Head from '../head';
import './style.css';
import * as utils from '../../utils';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

function Controls({cart, onDelete}){
  const [cartActive, setCartActive] = useState(false)

  const cn = bem('Controls')
  console.log(cart)

  return (
    <div className={cn()}>
      <div className={cn('totalPrice')}>
        В корзине: 
        <span>
          {cart.length !== 0 ? `${cart.length} ${utils.plural(cart.length, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${utils.countTotalPrice(cart)}` : 'пусто'}
        </span>
      </div>
      <button className={cn('actions')} onClick={() => setCartActive(true)}>
        Перейти
      </button>

      <Cart
          cart={cart}
          onCloseCart={() => setCartActive(false)}
          onDeleteItemFromCart={onDelete}
          totalPrice={utils.countTotalPrice(cart)}
        />
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ),
  onDeleteCartItem: PropTypes.func,
};

export default Controls;