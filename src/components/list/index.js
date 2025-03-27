import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { getCartTotalCost } from '../../utils';

function List({ list, onDeleteItem = () => {}, onAddItem = () => {}, isCartList = false }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item isCartItem={isCartList} item={item} onDelete={onDeleteItem} onAdd={onAddItem} />
        </li>
      ))}
      {isCartList && (
        <div className="List-total">
          <span>Итого:</span>
          <span>{getCartTotalCost(list)}</span>
        </div>
      )}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func,
  isCartList: PropTypes.bool,
};

export default React.memo(List);
