import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAddItem, onDeleteItem, isCart = false}) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} onAddToCart={onAddItem} onDeleteFromCart={onDeleteItem} isCart={isCart}/>
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
  isCart: PropTypes.bool,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default React.memo(List);
