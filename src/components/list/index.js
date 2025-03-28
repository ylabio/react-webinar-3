import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({
  list,
  variant = 'default', 
  onDeleteItem = () => {},
  onAddToCart = () => {},
}) {
  
  const renderItem = (item) => {
    if (variant === 'cart') {
      return (
        <Item
          variant='cart'
          item={item}
          onDelete={onDeleteItem}
          onAddToCart={onAddToCart}
        />
      );
    }
    return (
      <Item
        item={item}
        onDelete={onDeleteItem}
        onAddToCart={onAddToCart}
      />
    );
  };

  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          {renderItem(item)}
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
  variant: PropTypes.oneOf(['default', 'cart']),
  onDeleteItem: PropTypes.func,
  onAddToCart: PropTypes.func,
};

export default React.memo(List);
