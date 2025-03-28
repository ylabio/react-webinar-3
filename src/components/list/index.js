import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAddToCart, onDeleteFromCart, isInCart, cart }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item
            item={item}
            onAddToCart={onAddToCart}
            onDeleteFromCart={onDeleteFromCart}
            isInCart={isInCart}
            cart={cart}
          />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
  isInCart: PropTypes.bool,
  cart: PropTypes.objectOf(PropTypes.number),
};

List.defaultProps = {
  onAddToCart: () => { },
  onDeleteFromCart: () => { },
  isInCart: false,
  cart: {},
};

export default React.memo(List);
