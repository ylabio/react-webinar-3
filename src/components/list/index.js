import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import CartItem from '../cart-item';
import './style.css';

function List({ list = [], cart = [], isCartOpen = false, onAddCartItem = () => {}, onDeleteCartItem = () => {} }) {
  return (
    <>
      {!isCartOpen 
        ?
          <ul className="List">
            {list.map(item => (
              <li key={item.code} className="List-item">
                <Item item={item} onAdd={onAddCartItem} />
              </li>
            ))}
          </ul>
        :
          <ul className="List">
            {cart.map(item => {
              return (
                <li key={item.code} className="List-item">
                  <CartItem item={item} onDelete={onDeleteCartItem} />
                </li>
              )
            })}
          </ul>
      }
    </>
  );
};

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ),
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ),
  isCartOpen: PropTypes.bool,
  onAddCartItem: PropTypes.func,
  onDeleteCartItem: PropTypes.func
};

export default React.memo(List);