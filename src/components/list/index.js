import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list = [], variant='default', onAddToCart = () => {}, onDeleteFromCart = () => {} }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} variant={variant} onAddToCart={onAddToCart} onDeleteFromCart={onDeleteFromCart}/>
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
  variant: PropTypes.string,
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
};

export default React.memo(List);
