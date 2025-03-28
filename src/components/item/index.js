import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAddToCart }) {
  return (
    <div
      className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div>
        {`${item.price} ₽`}
      </div>
      <div className="Item-actions">
        <button onClick={() => onAddToCart(item.code)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func
};

Item.defaultProps = {
  onAddToCart: () => { },
};

export default React.memo(Item);
