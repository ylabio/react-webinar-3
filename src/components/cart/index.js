import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural, formatPrice } from '../../utils';

function Cart({ count, sum, openModal = () => {} }) {
  return (
    <div className="Cart">
      <button onClick={openModal}>{
      count === 0 ?
      'Пусто' : 
      `${count} ${plural(count, {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      })} / ${formatPrice(sum)}`
    }</button>
    </div>
  );
}

Cart.propTypes = {
  count: PropTypes.number,
  sum: PropTypes.number,
  openModal: PropTypes.func,
};


export default React.memo(Cart);
