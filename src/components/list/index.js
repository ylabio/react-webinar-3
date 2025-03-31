import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import CartItem from '../cart-item';
import './style.css';

function List({ list = [], addToCart = () => { }, deleteFromCart = () => { }, type = 'main' }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          {
            type === 'main'
              ? <Item item={item} addToCart={addToCart} />
              : <CartItem item={item} deleteFromCart={deleteFromCart} />
          }
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
  addToCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
  type: PropTypes.oneOf(['main', 'cart']).isRequired,
};

export default React.memo(List);
