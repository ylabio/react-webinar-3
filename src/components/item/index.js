import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item({
  item,
  onAddToCart = () => {}
}) {
  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onAddProduct: e => {
      e.stopPropagation();
      onAddToCart(item);
    },
  };

  return (
    <div className='Item'>
      <div className="Item-title">
        <b>{item.title}</b>
        <b className="Item-price">{Number(item.price).toLocaleString('ru-RU')} &#8381;</b>
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddProduct}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

export default React.memo(Item);
