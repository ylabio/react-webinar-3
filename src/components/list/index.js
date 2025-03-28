import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAddToCart }) {
  return (
    <ul className="List">
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
      code: PropTypes.number,
      onAddToCart: PropTypes.func,
    }),
  ).isRequired,
};

List.defaultProps = {
  onAddToCart: () => {},
};

export default React.memo(List);
