import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAddToCart }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.title} className="List-item">
          <Item item={item} onClick={onAddToCart} isRemovable={false} />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func,
};

export default React.memo(List);
