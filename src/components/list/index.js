import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({
  variant = 'default',
  list,
  totalPrice = 0,
  onAddItem = () => {},
  onDeleteItem = () => {},
}) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          {variant === 'cart' ? (
            <Item variant="cart" item={item} onDelete={onDeleteItem} />
          ) : (
            <Item item={item} onAdd={onAddItem} />
          )}
        </li>
      ))}

      {variant === 'cart' && (
        <li className="List-total">
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
      )}
    </ul>
  );
}

List.propTypes = {
  variant: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  totalPrice: PropTypes.number,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default React.memo(List);
