import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list , onBasketItem = () => {}  }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} onBasket={onBasketItem}  />
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
  onBasketItem: PropTypes.func,
};

export default React.memo(List);
