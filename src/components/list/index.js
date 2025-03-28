import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({list, onAddItemToCart = () => {}, onRemoveItemFromCart = () => {}, isCartMode = false}) {
  return (
    <ul className="List">
      {list.map(item => {
        return (
          <li key={item.code} className="List-item">
            <Item 
              item={item} 
              onAddItemToCart={onAddItemToCart}
              onRemoveItemFromCart={onRemoveItemFromCart}
              isCartMode={isCartMode} 
              quantity={item.quantity}
            />
          </li>
        );
      })}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
  onAddItemToCart: PropTypes.func,
  onRemoveItemFromCart: PropTypes.func,
  isCartMode: PropTypes.bool,
};


export default React.memo(List);
