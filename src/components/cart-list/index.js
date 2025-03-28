import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';

function CartList({ list, onDeleteItem }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.title} className="List-item">
          <Item item={item} onDelete={onDeleteItem} isRemovable={true}/>
        </li>
      ))}
    </ul>
  );
}

CartList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
};

export default React.memo(CartList);
