import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAbbBasket = () => {}, onDeleteBasket = () => {} }) {

  const callbacks = {

    onAbbBasket: e => {
      e.stopPropagation();
      onAbbBasket(item.code);
    },

    onDeleteBasket: e => {
      e.stopPropagation();
      onDeleteBasket(item.code);
    },
  };


  return (
    <div className='Item'>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-actions">
      {item.quantity !== undefined && <div className='Item-quantity'>{item.quantity + " шт"}</div>}
        <div className='Item-price'>{item.price} ₽</div>
      {item.quantity === undefined && <button className='button_add' onClick={callbacks.onAbbBasket}>Добавить</button>}  
      {item.quantity !== undefined && <button className='button_delete' onClick={callbacks.onDeleteBasket}>Удалить</button>} 
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onAbbBasket: PropTypes.func,
  onDeleteBasket: PropTypes.func,
};

export default React.memo(Item);
