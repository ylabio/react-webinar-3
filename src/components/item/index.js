import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Controls from '../controls';

function Item({ item, addToCart = () => { } }) {
  const callbacks = {
    onAdd: () => {
      addToCart(item);
    },
  };

  return (
    <div className='Item'>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>

      <div className="Item-price">
        {item.price.toLocaleString('ru-RU')} ₽
      </div>

      <div className="Item-actions">
        <Controls type={'add'} onClick={callbacks.onAdd} />
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
  addToCart: PropTypes.func,
};

export default React.memo(Item);
