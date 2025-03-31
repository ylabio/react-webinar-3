import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import CartIcon from '../cart-icon';
import { plural, formatNumber } from '../../utils';
import { cn as bem } from '@bem-react/classname';

function List({ 
  list, 
  onAddToCart, 
  cartTotal = 0, 
  cartSum = 0, 
  onOpenCart 
}) {

  const cn = bem('List');
  return (
    <ul className={cn()}>
      <div className={cn('cart')}>
          <button onClick={onOpenCart}
          ><CartIcon/>
          {cartTotal > 0 
            ? `${cartTotal} ${plural(cartTotal, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatNumber(cartSum)} ₽`
            : 'Пусто'}</button>
        </div>
      {list.map(item => (
        <li key={item.code} className={cn('item')}>
          <Item item={item} onAddToCart={onAddToCart} />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  cartTotal: PropTypes.number,
  cartSum: PropTypes.number,
  onOpenCart: PropTypes.func,
};

export default React.memo(List);
