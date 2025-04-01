import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import CartItem from '../cart-item';

function CartList({ items, totalPrice = 0, onDeleteItem = () => {} }) {
  return (
    <ul className="CartList">
      {items.map(item => (
        <li key={item.code} className="CartList-item">
          <CartItem item={item} onDelete={onDeleteItem} />
        </li>
      ))}

      <li className="CartList-total">
        <span>
          <b>Итого:</b>
        </span>
        <span>
          <b>
            {Intl.NumberFormat('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              maximumFractionDigits: 0,
            }).format(totalPrice)}
          </b>
        </span>
      </li>
    </ul>
  );
}

CartList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  totalPrice: PropTypes.number,
  onDeleteItem: PropTypes.func,
};

export default React.memo(CartList);
