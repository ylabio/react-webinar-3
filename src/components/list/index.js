import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import CartItem from '../cart-item';
import './style.css';

function List({ items, mode = 'catalog', onAddToCart, onRemoveFromCart }) {
  return (
    <ul className='List'>
      {items.map(item => (
        <li key={item.code} className='List-item'>
          {mode === 'catalog' ? (
            <Item item={item} onAddToCart={onAddToCart} />
          ) : (
            <CartItem
              title={item.title}
              count={item.count}
              price={item.price}
              onDelete={() => onRemoveFromCart(item.code)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number
    })
  ).isRequired,
  mode: PropTypes.oneOf(['catalog', 'cart']),
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func
};

export default React.memo(List);
