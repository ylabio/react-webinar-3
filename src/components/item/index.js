import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

// Значения по умолчанию задаём в аргументах функции и раскрываем их через деструктуризацию
function Item({item, onAddItemToCart = () => {}, onRemoveItemFromCart = () => {}, isCartMode = false}) {

  const callbacks = {
    onButtonClick: e => {
      e.stopPropagation();
      if (isCartMode) {
        onRemoveItemFromCart(item.code);
      } else {
        onAddItemToCart(item.code);
      }
    },
  };
  return (
    <div
      className={'Item'}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className='Item-info'>
        {isCartMode && <div className="Item-quantity">{item.quantity} шт</div>}
        <div className='Item-price'>
          {item.price} ₽
        </div>
      </div>
      <div className="Item-actions">
      <button className={isCartMode ? 'Item-delete' : ''} onClick={callbacks.onButtonClick}>
          {isCartMode ? 'Удалить' : 'Добавить'}
        </button>      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddItemToCart: PropTypes.func,
  onRemoveItemFromCart: PropTypes.func,
  isCartMode: PropTypes.bool,
  quantity: PropTypes.number,
};


export default React.memo(Item);
