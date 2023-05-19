import React, { useState } from 'react';
import Cart from '../cart';
import { plural, getTotalCost } from '../../utils';
import './style.css';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

const Controls = ({ cart, onDeleteCartItem }) => {
  const cn = bem('Controls');
  const [isOpenCart, setIsOpenCart] = useState(false);

  return (
    <div className={cn()}>
      <div className={cn('cart')}>
        В корзине:
        <span className={cn('data')}>
          {cart.length
            ? ` ${cart.length} ${plural(cart.length, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} 
         / ${getTotalCost(cart)} ₽`
            : 'пусто'}
        </span>
      </div>
      <button className={cn('actions')} onClick={() => setIsOpenCart(true)}>
        Перейти
      </button>
      {isOpenCart && (
        <Cart
          cart={cart}
          onCloseCart={() => setIsOpenCart(false)}
          onDeleteCartItem={onDeleteCartItem}
          totalCost={getTotalCost(cart)}
        />
      )}
    </div>
  );
};

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
