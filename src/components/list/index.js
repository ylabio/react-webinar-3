import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAddToCart, onRemove, isCart }) {
  return (
    <div className="List">
      {list.map(item => (
        <Item
          key={item.code}
          item={item}
          onAction={isCart ? () => onRemove(item.code) : () => onAddToCart(item.code)}
          isCart={isCart}
        />
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func,
  onRemove: PropTypes.func,
  isCart: PropTypes.bool,
};

List.defaultProps = {
  isCart: false,
};

export default React.memo(List);
