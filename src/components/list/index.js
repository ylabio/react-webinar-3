import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import CartItem from '../cart-item';
import './style.css';

function List({ list = [], onAddCartItem = () => {}, onDeleteCartItem = () => {} }) {
  return (
    <>
      <ul className="List">
        {list.map(item => (
          <li key={item.code} className="List-item">
            {!item.count ?
              <Item item={item} onAdd={onAddCartItem} />
              :
              <CartItem item={item} onDelete={onDeleteCartItem} />
            }
          </li>
        ))}
      </ul>
    </>
  );
};

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      count: PropTypes.number
    }),
  ),
  onAddCartItem: PropTypes.func,
  onDeleteCartItem: PropTypes.func
};

export default React.memo(List);