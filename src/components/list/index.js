import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onDeleteItem = () => {} , onSelectItem = () => {} , onBasketItem = () => {}  }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} onDelete={onDeleteItem} onSelect={onSelectItem} onBasket={onBasketItem}  />
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
  onDeleteItem: PropTypes.func,
  onBasketItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

export default React.memo(List);
