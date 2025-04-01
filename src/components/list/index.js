import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import CartItem from '../cart-item'
import './style.css';

function List({ list, onAddToCart = () => {}, onRemove = null, isCart = false }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          {isCart ? (
            <CartItem item={item} onRemove={onRemove} />
          ) : (
            <Item item={item} onAddToCart={onAddToCart} />
          )}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func,
  onRemove: PropTypes.func,
  isCart: PropTypes.bool,
};

export default React.memo(List);
