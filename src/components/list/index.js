import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import CartIcon from '../cart-icon';
import { plural, formatNumber } from '../../utils';

function List({ list, onAddToCart, cartTotal, cartSum, onOpenCart   }) {
  return (
    <ul className="List">
      <div className="List-cart">
          <button onClick={onOpenCart}
          ><CartIcon/>
          {cartTotal > 0 
            ? `${cartTotal} ${plural(cartTotal, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatNumber(cartSum)} ₽`
            : 'Пусто'}</button>
        </div>
      {list.map(item => (
        <li key={item.code} className="List-item">
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

List.defaultProps = {
  onAddToCart: () => {},
  cartTotal: 0,
  cartSum: 0,
  onOpenCart: () => {}
};

export default React.memo(List);
