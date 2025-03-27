import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAddItem = (e) => {}, onDeleteItem = (e) => {} }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item}
                onAdd={onAddItem}
                onDelete={onDeleteItem}
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
  ),
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};


export default React.memo(List);
