import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAddToCart, onDeleteFromCart, inCart = false }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item
            item={item}
            onAddToCart={onAddToCart}
            onDeleteFromCart={onDeleteFromCart}
            inCart={inCart}
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
  inCart: PropTypes.bool.isRequired,
};

export default React.memo(List);
